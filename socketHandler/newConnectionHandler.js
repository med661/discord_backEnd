const serverStore= require("../serverStore")
const friendsUpdate=require("./updates/friends")
const roomsUpdate= require('./updates/rooms')

const  newConnectionHandler =async(socket,io)=>{
const userDetails = socket.user
    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
    })
    //update pending friends invitation liste
   friendsUpdate.updateFriendPendingInvitations(userDetails.userId)
   
   friendsUpdate.updateFriends(userDetails.userId)
setTimeout(()=>{
    roomsUpdate.updateRooms(socket.id)

},[500])
}
module.exports = newConnectionHandler