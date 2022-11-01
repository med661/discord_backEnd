const Message = require("../models/message");
const Conversation = require("../models/conversation");
const chatUpadates=require("./updates/chat")
const directMessagehandler=async(socket,data)=>{
    try {
        console.log("direct message event is handled");
        const {userId}=socket.user
        const {receiverUserId,content}=data;
        const message= await Message.create({
            content: content,
            author: userId,
            date: new Date(),
            type: 'DIRECT'
        })

        //find if conversions exist with two users if nor create one
        const conversation = await Conversation.findOne({
            participants:{$all:[userId,receiverUserId]}
        })

        if(conversation){
            conversation.messages.push(message._id);
            await conversation.save()

            //perform and update to sender and receiverif is online
            chatUpadates.updateChatHistory(conversation._id.toString())

        
        }else{
            //create a new conversation if not exist

            const newConversation = await Conversation.create({
                messages:[message._id],
                participants:[userId,receiverUserId]

            })
            chatUpadates.updateChatHistory(newConversation._id.toString())


            //perform and update to sender and receiverif is online
        }
        

        
    } catch (err) {
        console.log(err);
    }

}
module.exports =directMessagehandler