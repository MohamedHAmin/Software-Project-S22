const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const UserVerification = require("../models/UserVerification")
const Token = require("../models/Token")
const router = new express.Router()
const bcrypt = require("bcryptjs"); //generating unique strings 
const nodemailer = require("nodemailer")
const {v4: uuidv4 } = require("uuid")
require('env-cmd')
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
const sendVerificationEmail = async({_id,email},res)=>{
  //url to be used in the email 
  try{
  const currenturl = process.env.CURRENTURL
     const hashstring=_id.toString()+process.env.SECRET
  const uniqueString = await bcrypt.hash(hashstring, 8);
  const notaccepteduniqustreng=uniqueString
   const accepteduniqueString=uniqueString.toString().replaceAll('+','xMl3Jk').replaceAll('/','Por21Ld').replaceAll('=','Ml32')
   console.log("🚀 ~ file: userauthroute.js ~ line 29 ~ sendVerificationEmail ~ accepteduniqueString", accepteduniqueString)
  //hash the string 
  
    const newVerification = new UserVerification({
      userId : _id,
      email:email,
      uniqueString: notaccepteduniqustreng,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000, //6 hrs in ms]
    })  
    const mailOptions = {
      from : process.env.AUTH_EMAIL,
      to: email,
      subject : " Verify Your Email",
      html: `<p> Verify the email address to complete the signup and login to your account. </p> 
      <p> This Link <b> expires in 6 hours </p> </p> <p> Press <a href=${currenturl + "user/verify/" + _id + "/" + accepteduniqueString}> here </a> to proceed </p>`
      
    }
    
    await newVerification.save()
      transporter.sendMail(mailOptions)
  
}catch(e){
console.log(e);
}

}
router.get("/verify/:userId/:uniqueString", async(req,res)=>{
  try{
    let {userId, uniqueString} = req.params 
    uniqueString =uniqueString.toString().replaceAll("por21Ld",'/').replaceAll('xMl3Jk','+').replaceAll('Ml32','=')
    
    console.log("🚀 ~ file: userauthroute.js ~ line 61 ~ router.get ~ uniqueString", uniqueString)
    const result=await UserVerification.find({userId})
      if(result.length > 0 ){
        const hasheduniqueString = result[0].uniqueString
            if(uniqueString===hasheduniqueString){
              await User.updateOne({_id:userId},{verified:true})            
               await UserVerification.deleteOne({userId})             
              }
        }
          res.send("Email sent , pending verification")
  } catch (e){
   res.send(e)
  }
  
})

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
      res.status(201).send({ status:"success"});
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
      await Token.deleteMany({ token: req.token })
   
      res.status(200).end("Success")}
      
      
      catch (e) {
      res.status(400).send({ error: e.toString() });
      }
  })

  router.delete("/logoutall",auth('any'), async (req, res) => {
      try{
      await Token.deleteMany({ 
        ownerId: req.user._id
      })
      res.status(200).end("Success")
      
      }
      catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  })

      

  module.exports = router 