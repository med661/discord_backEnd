const roomInitializedConnectionHandler=(socket,data) => {
    const {connUserSocketId}=data;
    const initData={connUserSocketId:socket.id}
    socket.to(connUserSocketId).emit('conn-init',initData)
}

module.exports=roomInitializedConnectionHandler