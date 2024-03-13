let mongoose=require('mongoose');

let RegisterUserSchema=new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String,
     
        unique:true
    },
    password:{
        type:String,
       
    },
    role:{
        type:String,
      
       
    },
},{
    timestamps:true
});
const RegisterUsers=mongoose.model('RegisterUserSchema', RegisterUserSchema);

module.exports=RegisterUsers;