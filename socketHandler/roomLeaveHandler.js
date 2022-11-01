const serverStore =require('../serverStore')
const roomsUpdate= require('./updates/rooms')
const roomLeaveHandler=(socket,data)=>{
    const {roomId} = data
    const activeRoom=serverStore.getActiveRoom(roomId)
    if (activeRoom){
        //console.log(activeRoom,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        serverStore.leaveActiveRoom(roomId,socket.id)
        
       const updatedActiveRoom = serverStore.getActiveRoom(roomId);
       console.log(updatedActiveRoom,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

      if (updatedActiveRoom) {
        updatedActiveRoom.participants.forEach((participant)=>{
            socket.to(participant.socketId).emit('room-participant-left',{
                connUserSocketId:socket.id,
            })
        })
        
       }
        roomsUpdate.updateRooms()
    }
    
}
module.exports =roomLeaveHandler