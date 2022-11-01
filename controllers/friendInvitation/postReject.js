
const FriendInvitation=require('../../models/FriendInvitation')
const friensUpdates=require('../../socketHandler/updates/friends')
const postReject=async(req, res)=>{
  try {
    const {id}=req.body
    const {userId}=req.user
    //remove invitation from friend invitation collection
    const invitationExists= await FriendInvitation.exists({_id: id})
    if(invitationExists){
        await FriendInvitation.findByIdAndDelete(id)

    }
    friensUpdates.updateFriendPendingInvitations(userId)

    return res.status(200).send('invitation successfully reject')
    
  } catch (err) {
    console.log(err)
    return res.status(500).send("something went wrong please try again")
    
  }
    

}

module.exports=postReject;