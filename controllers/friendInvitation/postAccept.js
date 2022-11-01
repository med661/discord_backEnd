const FriendInvitation=require('../../models/FriendInvitation')
const User=require('../../models/user')

const friensUpdates=require('../../socketHandler/updates/friends')
const postAccept=async(req, res)=>{
    try {
        const {id}=req.body;
        const invitation = await FriendInvitation.findById(id)
        if(!invitation){
            return res.status(401).send('Error occured.Please try again')

        }
        const {senderId,receiverId}=invitation
        console.log({senderId,receiverId})

        //add friend to both users
        const senderUser=await User.findById(senderId)
        senderUser.friends=[...senderUser.friends,receiverId]


        const receiverUser=await User.findById(receiverId)
        receiverUser.friends=[...receiverUser.friends,senderId]
        await receiverUser.save()
        await senderUser.save()
        ///delete inviation

        await FriendInvitation.findByIdAndDelete(id)

                //update liste of the friends if the user is online

        
                ///update liste of friends pending inviation 

        await FriendInvitation.findByIdAndDelete(id)

        friensUpdates.updateFriendPendingInvitations(receiverId.toString())
        friensUpdates.updateFriends(senderId.toString())
        friensUpdates.updateFriends(receiverId.toString())

        return res.status(200).send("Friend successfully added")

    } catch (err) {
    console.log(err)
     return res.status(500).send("something went wrong please try again")
    }



}

module.exports=postAccept;