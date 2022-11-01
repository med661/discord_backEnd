const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const conersationSchema=new Schema({
    participants:[
        {
            type: Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    messages:[
        { 
            type: Schema.Types.ObjectId,
            ref:'Message'
        }
    ]
})
module.exports=mongoose.model('Conversation',conersationSchema);