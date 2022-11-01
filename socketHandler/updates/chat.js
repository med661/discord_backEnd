const Conversation =require('../../models/conversation')
const serverStore =require('../../serverStore')


const   updateChatHistory=async(conversationId,toSpecifiedSocketId=null)=>{
const conversation =await Conversation.findById(conversationId).populate({
    path:"messages",
    model:"Message",
    populate:{
        path:"author",
        model:"user",
        select:"username _id",
    }
});
//console.log({cc:conversation});
if(conversation){
    const io= serverStore.getSocketServerInstance();
    if (toSpecifiedSocketId) {
        //initial update f chat history
        return io.to(toSpecifiedSocketId).emit('direct-chat-history',{
            messages:conversation.messages, 
            participants:conversation.participants
        })
        
    }

    //check if user is online
    //if yes emit to them update of messages
    conversation.participants.forEach(userId=>{
        const activeConnections=serverStore.getActiveConnections(userId.toString());
        activeConnections.forEach(socketId=>{
            io.to(socketId).emit('direct-chat-history',{
                messages:conversation.messages, 
                participants:conversation.participants
            })
        })
    })
}


}

module.exports={
    updateChatHistory

}