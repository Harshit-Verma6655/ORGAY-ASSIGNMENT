require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser')
const RegisterUsers=require('./models/user');
const notification=require('./models/notification');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const app=express();

const cors=require('cors');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(ext)
const accessSecret='123456';
// const refreshSecret='orgae@123';
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongo connected...");
});


let whiteList=[process.env.WHITELIST, "http://localhost:5174"];
let options={
    origin:function (origin, callback){
            if(whiteList.indexOf(origin)!=-1 ||!origin){
                callback(null, true);
            }else{
                callback(new Error('not allowed by cors!'));
            }
    }
}

const reftoken=[];
const saltRound=10;

app.use(cors(options))



function checkAuth(req, res, next){
    const token=req.headers['authorization']?.split(" ");
    // console.log(token[1]);
    if(!token[1]){
       return res.json({"status":"failed","msg":"not authorized!"})
    }
    jwt.verify(token[1],accessSecret,(err, user)=>{
        if(err){
           return res.json({"msg":"not authenticate"});
        }else{
            // console.log(user);
            req.user=user;
          return  next();
        }
    } )
    
    }


app.post('/admin',checkAuth,async(req, res)=>{

    // console.log(req.body);
   
        let id=req.body.id;
    let obj= await RegisterUsers.find({_id:id});
   return res.json({"msg":"success","user":obj});
    
    
    // return res.json(obj);
 })



 app.post('/users',checkAuth,async(req, res)=>{

    // console.log(req.body);
    if(req.body.role=='admin'){
        let id=req.body.id;
    let obj= await RegisterUsers.find({role:"admin"});
   return res.json({"msg":"success","user":obj});
    }else if(req.body.role=='employee'){
   
        let obj= await RegisterUsers.find({role:"employee"});
       return res.json({"msg":"success","user":obj});
    }else{
       return res.json({"msg":"invalid role!"});
    }
    
    // return res.json(obj);
 })







app.post('/login', async(req, res)=>{

    try{
    const { email, password}=req.body;
    console.log("user", req.body);
    let user=await RegisterUsers.findOne({"email":email});
    console.log("user", user);
    if(!user){
        return res.status(401).json({"msg":"invalid email or not exist"});
    }
    bcrypt.compare(password, user?.password,async(err, result)=>{
        if(err){
            user=null;
            return  res.json({status:"failed"})
        }
        else{
            jwt.sign({"email":user.email},accessSecret,(err, token)=>{
                return res.json({"user":user._id, token, "role":user.role});
            
               });
               return;
        }

    })

   

    // if(!user)return res.status(400).json({"status":"failed", "msg":"invalid user password"});


 


    // res.cookie('accesstoken', accesstoken);
    // res.cookie('refreshToken', accesstoken, {httpOnly:true});
    
}catch(err){
   return res.json(err);
}

});





app.post('/register',async(req,res)=>{

    
        const body=req.body;
        console.log("register data", body);
        // bcrypt.hash(body.password,saltRound,async(err, hash)=>{
        //     if(err){
        //         return res.json(err);
        //     }
        //     await RegisterUsers.create({name:body.name,email:body.email, password:hash, role:body.role});
        // })

        await RegisterUsers.create({name:body.name,email:body.email, password:body.password, role:body.role});
        
        let user=await RegisterUsers.findOne({email:body.email});
        console.log("user...",user);
       return res.json({"id":user});
    
    });

    // app.post('/refresh', (req, res)=>{
    //     const body=req.body;
    //     if (req.cookies?.refreshToken) {
 
          
    //         const refreshToken = req.cookies.jwt;

         
    //         jwt.verify(refreshToken, refreshSecret,
    //             (err) => {
    //                 if (err) {
     
               
    //                     return res.status(406).json({ message: 'Unauthorized' });
    //                 }
    //                 else {
                     
    //                     const accessToken = jwt.sign({
    //                         email: body.email
    //                     }, refreshSecret, {
    //                         expiresIn: '30m'
    //                     });
    //                     return res.json({ accessToken });
    //                 }
    //             })
    //     } else {
    //         return res.status(406).json({ message: 'Unauthorized' });
    //     }
    // })

    // app.get('/all',async (req, res)=>{
    //     let users=await RegisterUsers.find({});
         
    //     return res.json({"msg":"success","users":users});
        
    // })

    // app.get('/employee',async (req, res)=>{
    //     let users=await RegisterUsers.find({"role":"employee"});
    //   return  res.json(users);
    // })


    // app.get('/admin',async (req, res)=>{
    //     let users=await RegisterUsers.find({"role":"admin"});
    //    return res.json(users);
    // })

    app.post('/notification',checkAuth,async(req,res)=>{

        const body=req.body;
        console.log("notification data", body);
      let {senderId,msg,senderName, recieverId,checked }=body;

        await notification.create({senderId,msg, recieverId, checked,senderName});

       return res.json({"msg":"success"});
    
    })

    app.post('/getnotification',checkAuth,async(req,res)=>{

        const body=req.body;
        let {recieverId}=body;
        console.log("notification data", body);
      let data=await notification.find({recieverId});
       return res.json({data});
    
    })



    app.post('/viewed',async(req,res)=>{

        const body=req.body;
        let {senderId}=body;
        // console.log("notification data", body);
      let data=await notification.findOneAndUpdate({senderId},{$set:{checked:true}});
       return res.json({data});
    
    })



    



app.listen(process.env.PORT,()=>{
    console.log("active at 4000")
});
