const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const UserVerification = require("../models/UserVerification")
const generator = require('generate-password')
const Token = require("../models/Token")
const passport = require("passport")
const router = new express.Router()
const bcrypt = require("bcryptjs"); //generating unique strings 
const nodemailer = require("nodemailer")
const {v4: uuidv4 } = require("uuid")
const { urlencoded } = require("express")
const { identity } = require("lodash")
const res = require("express/lib/response")
require('env-cmd')
require('../passport/passport')(passport)
//nodemailer setup [less secure option on ]
let transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  }
})
//  transporter.verify((error,success)=>{
//  })

//~~~~~~~~~~~~Signup~~~~~~~~~~~//
router.post("/signup",async (req, res) => {
  //new signup is to check if that email is found and if the verification is true , delete the user verification 
    //if the verified att is false , delete both 
  
    try {
      const deletedUser =await User.deleteOne({$and:[{email:req.body.email},{verified:false}]})
      if(deletedUser)
      {  await UserVerification.deleteOne({email:req.body.email})}
      const user = new User({...req.body,verified:false});
      const result = await user.save()
      if(result){
       sendVerificationEmail(result,res)
      }
      //don't generate token unless verified [with login now]
      res.status(201).send(user);
    } catch (e) {
      if(e.index){
        res.status(400).send({ error:e });
       }
       res.status(400).send({error: e.toString()});
    }
  });
             //~~~~~~~~~~~~Login~~~~~~~~~~~//
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email_or_username,
        req.body.password
      );
      const token = await user.user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  });
  
  //token is put in header [in postman]
  router.delete("/logout" ,auth('any'),async (req, res) => {
    try{
     const a= await Token.deleteMany({ token: req.token.token })
     console.log("🚀 ~ file: userauthroute.js ~ line 67 ~ router.delete ~ a", a)
      
      res.status(200).send({success:"Success"})}
      
      
      catch (e) {
      res.status(400).send({ error: e.toString() });
      }
    })
    
    router.delete("/logoutall",auth('any'), async (req, res) => {
      try{
        await Token.deleteMany({ 
          ownerId: req.user._id.toString()
        })

        res.status(200).send({success:"Success"})
        
      }
      catch (e) {
        res.status(400).send({ error: e.toString() });
      }
    })
    // ~~~~~~~~Email Verification~~~~~~~~~~~~//
    const sendVerificationEmail = async({_id,email},res)=>{
      //url to be used in the email 
      try{
      const currenturl = process.env.CURRENTURL
         const hashstring=_id.toString()+process.env.SECRET
      const uniqueString = await bcrypt.hash(hashstring, 8);
    // const notaccepteduniqustreng=uniqueString
      //const accepteduniqueString=uniqueString.toString().replaceAll('+','xMl3Jk').replaceAll('/','Por21Ld').replaceAll('=','Ml32')
    
      //hash the string 
      
        const newVerification = new UserVerification({
          userId : _id,
          email:email,
          uniqueString: uniqueString,
          createdAt: Date.now(),
          expiresAt: Date.now() + 21600000, //6 hrs in ms]
        })  
        const mailOptions = {
          from : process.env.AUTH_EMAIL,
          to: email,
          subject : " Verify Your Email",
          html: `<p> Verify the email address to complete the signup and login to your account. </p> 
          <p> This Link <b> expires in 6 hours </p> </p> <p> Press <a href=${currenturl + "user/verify/" + _id + "?hash=" + uniqueString}> here </a> to proceed </p>`
          
        }
        
        await newVerification.save()
          transporter.sendMail(mailOptions)
      
    }catch(e){
    console.log(e);
    }
    
    }
    router.get("/verify/:userId/", async(req,res)=>{
      try{
        let userId=req.params.userId;
        let uniqueString = req.query.hash; 
        //uniqueString =uniqueString.toString().replaceAll("por21Ld",'/').replaceAll('xMl3Jk','+').replaceAll('Ml32','=')
    
        const result=await UserVerification.find({userId})
          if(result.length > 0 ){
            let hasheduniqueString = result[0].uniqueString
                if(uniqueString===hasheduniqueString){
                  await User.updateOne({_id:userId},{verified:true})            
                  await UserVerification.deleteOne({userId})             
                  }
            }
              res.send({Status:"Email sent , pending verification"})
      } catch (e){
       res.send(e)
      }
      
    })
      //~~~~~~~~~~~Forget Password~~~~~~~~~~~~~~~~//
  //post req received from FE 
  //There's a request to send an email which is called forgot password 
  router.post('/forgotpassword' , async(req,res)=>{
    //email to be sent link to and redirect url will be put in the email , he will be directed on that page on FE 
    const {email} = req.body
    try{
      //check if the email already exists in the user 
      const user = await User.find({ email:email})
      if(user.length>0){
        if(user[0].verified){
            SendResetEmail(user[0])
            res.send("Email sent , and password has been reset")
        }
        else{
          res.send({success:"Email hasn't been verified yet "})
        }
      } else{
        res.send({success:"Email is not found or registered"})
      }
  }
    catch(e) {
      res.send(e)
    }   
  })

  const SendResetEmail = async ({email})=>{
   
    //delete any existing forgot password requests by the user 
    try{

    var newPassword = generator.generate({
      length: 10,
      numbers: true
  });

  const mailOptions = {
    from : process.env.AUTH_EMAIL,
    to: email,
    subject : "Forgot your Password ? ",
    text: `Your new password is : ${newPassword}`
  }
  
      await transporter.sendMail(mailOptions)
      newPassword = await bcrypt.hash(newPassword,8)
      await User.updateOne({email},{password:newPassword})

    
    }
     catch(e)
    {
      console.log(e);
    }
  }
  
 //~~~~~~~~~~~~~~~~~~~~~~~Dummy Redirect Links~~~~~~~~~~~~~~~~~~~~~//
 router.get("/googlelogin/failed",(req,res)=>{
   res.status(401).json({
     success: false,
     message: "failure"
   })
 })
 router.get("/googlelogin/success",(req,res)=>{
   if(req.cookies){
   res.status(200).json({
     success: true,
     message : "successful",
     user:req.user,
     //cookies: req.cookies
   })
   
 }
 })

    //~~~~~~~~~~~~~~~~~~~~~~~Login with FB/GOOGLE ~~~~~~~~~~~~~~~~~~~~~~~//
    router.get('/auth/google', passport.authenticate('google', {scope:['profile','email']}),()=>{
     
      res.send({hy:"hy"})
    })

    router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect:'http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/',successRedirect:"http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/"}))
    //redirect pages will be later on implemented by FE
  
  //~~~~~~~~~~~~~~~~~~~~~~~Dummy Redirect Links~~~~~~~~~~~~~~~~~~~~~//
    module.exports = router;