const Conversation =require('../models/conversation')
const chatUpadates=require('./updates/chat')

const directChatHistoryHandler=async(socket,data)=>{
    try {
        const {userId}=socket.user;
        const {receiverUserId}=data
        const conversation=await Conversation.findOne({
            participants:{$all: [userId,receiverUserId]},
            type: 'DIRECT',

        })
        if (conversation){
            chatUpadates.updateChatHistory(conversation._id.toString(),socket.id)
        }

        
    } catch (err) {
        console.log(err);
    }

}

module.exports = directChatHistoryHandler
