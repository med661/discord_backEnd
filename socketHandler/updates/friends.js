const User = require("../../models/user");
const FriendInvitation = require("../../models/FriendInvitation");
const serverStore = require("../../serverStore");
const updateFriendPendingInvitations = async (userId) => {
  try {
    const pendingInvitation = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    //find all active connections of specificuserid

    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();
    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friend-invitation", {
        pendingInvitation: pendingInvitation ? pendingInvitation : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateFriends = async (userId) => {
    try {

        const receiverList=serverStore.getActiveConnections(userId)
if(receiverList.length > 0) {
    const user=await User.findById(userId,{_id :1,friends:1}).populate(
        'friends',
        '_id username mail'
    )

    if(user){
        const friendsListe=user.friends.map((f)=>{
            return {
                id:f._id,
                mail:f.mail,
                username:f.username
            }
        })
//find active connections of specific id (online useer)


//get io server instance
const io =serverStore.getSocketServerInstance();
receiverList.forEach(receiverSocketId=>{
io.to(receiverSocketId).emit('friends-list',{
    friends:friendsListe? friendsListe : []

})

})


    }

}
       
    } catch (err) {
        console.log(err);

    }
}

module.exports = {
  updateFriendPendingInvitations,
  updateFriends
};
