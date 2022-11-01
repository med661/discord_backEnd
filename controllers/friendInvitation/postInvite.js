const FriendInvitation=require('../../models/FriendInvitation')
const User=require('../../models/user')
const friensUpdates=require('../../socketHandler/updates/friends')
const postInvite=async(req, res)=>{
     const {targetMailAddress}=req.body;
    const {userId,mail}=req.user;
    //check if friend that we would like to invite is not user
    if (mail.toLowerCase()=== targetMailAddress.toLowerCase()) {
        
        return res.status(409).send("sorry you can't become a friend with your self") 
    }
    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase()
    })
    if (!targetUser) {
        return res.status(400).send(`Friend of ${targetMailAddress} has not be found.please check mail address`) 

    }
    //chek if invitationhas been already sent to user

    const invitationAlreadyreceived = await FriendInvitation.findOne({
        senderId :userId,
        receiverId :targetUser._id
    })
    if (invitationAlreadyreceived) {
        return res.status(409).send(`Invitation has been already sent`)
    }
    //chek if user with we would like to invite is already invitedour friend
    
    const userAlreadyFriends=targetUser.friends.find(friendId=>{
        friendId.toString()===userId.toString()
    })
    if (userAlreadyFriends) {
        return res.status(409).send("Friend already added .please check friend list")    
    }

    //create new invitation in database

const newInvitation = await FriendInvitation.create({
    senderId :userId,
    receiverId:targetUser._id
})
    //if invitation has been successfully created we would like to update friend invitation is online

//send pendingInvitationto specific user
friensUpdates.updateFriendPendingInvitations(targetUser._id.toString())

    return res.status(201).send('invitation has bee sent')
}
module.exports=postInvite;