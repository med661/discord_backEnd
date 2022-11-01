 
 const serverStore =require('../serverStore')
const roomsUpdates= require('./updates/rooms')
 const roomCreateHandler=(socket)=>{
    const socketId = socket.id
    const userId= socket.user.userId
    console.log('creating room event')
    const roomDetails=serverStore.addNewActiveRom(userId,socketId)
    //console.log({roomDetails})
    socket.emit('room-create',{
        roomDetails,
    });
    roomsUpdates.updateRooms()


}
module.exports = roomCreateHandler