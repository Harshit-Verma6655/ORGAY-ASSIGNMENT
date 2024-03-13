let mongoose=require('mongoose');

let notificationSchema=new mongoose.Schema({
    senderId:{
        type:String,
       
    },
    senderName:{
        type:String,
    },
    msg:{
        type:String,
    },
    recieverId:{
        type:String,
       
    },
    checked:{
        type:Boolean,
      
    },
},{
    timestamps:true
});
const notification=mongoose.model('notification', notificationSchema);

module.exports=notification;