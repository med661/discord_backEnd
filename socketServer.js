
const authSocket=require('./middleware/authSocket')
const newConnectionHandler =require('./socketHandler/newConnectionHandler')
const disconnectHandler=require('./socketHandler/disconnectHandler')
const serverStore=require('./serverStore')
const directMessagehandler= require('./socketHandler/directMessagehandler')
const directChatHistoryHandler=require('./socketHandler/directChatHistoryHandler')
const roomCreateHandler=require('./socketHandler/roomCreateHandler')
const roomJoinHandler=require('./socketHandler/roomJoinHandler')
const roomLeaveHandler=require('./socketHandler/roomLeaveHandler')
const roomInitializedConnectionHandler=require('./socketHandler/roomInitializedConnectionHandler')
const roomSignalDataHandler=require('./socketHandler/roomSignalDataHandler')
const registerSocketServer=(server) => {
  const io=require('socket.io')(server,{
    cors:{
        origin: '*',
        method:['GET',"POST"],
    }
  });

  serverStore.setSocketServerInstance(io)

  io.use((socket,next)=>{
    authSocket(socket,next);
  })

  const emitOnlineUsers=()=>{
    const onlineUsers=serverStore.getOnlineUsers()
    io.emit(
      'online-users',{onlineUsers})
  }
  io.on('connection',(socket) => {
    console.log("user Connectioned");
    console.log(socket.id);
    newConnectionHandler(socket,io)
    emitOnlineUsers()

    
    socket.on('direct-message',(data) => {
      directMessagehandler(socket,data)
    });

    socket.on('direct-chat-history',(data) => {
      directChatHistoryHandler(socket,data)
    });
    socket.on('conn-init',(data)=>{
      roomInitializedConnectionHandler(socket,data)

    })
    socket.on('conn-signal',(data)=>{
        roomSignalDataHandler(socket,data)

    })

    socket.on('disconnect',() =>{
        disconnectHandler(socket)
})
socket.on("room-join",(data)=>{
  roomJoinHandler(socket,data)
} )
socket.on('room-create',()=>{
  roomCreateHandler(socket)
});
socket.on('room-leave',(data)=>{
  roomLeaveHandler(socket,data)
  
})

})

setInterval(()=>{ 
 emitOnlineUsers()
},[1000*8])

  }
module.exports = {
    registerSocketServer,
}