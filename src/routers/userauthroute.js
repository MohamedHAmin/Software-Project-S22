const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const UserVerificatoin = require("../models/UserVerification")
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
transporter.verify((error,success)=>{
  if(error){
    console.log(error);
  }else {
    console.log("Ready for messages ");
    console.log(success);
  }
})
            //~~~~~~~~~~~~Signup~~~~~~~~~~~//
router.post("/signup",async (req, res) => {
  
   
    try {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user,token});
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  });
             //~~~~~~~~~~~~Login~~~~~~~~~~~//
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email_or_username,
        req.body.password
      );
      const token = await user.generateAuthToken();
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