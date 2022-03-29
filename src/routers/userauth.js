const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const Token = require("../models/Token")
const router = new express.Router()
const methodOverride = require('method-override')
/////////////////~~~~~~~~~~~~Signup~~~~~~~~~~~////////////////
router.post("/user/signup", async (req, res) => {
  
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      console.log(token)
      res.send({ user,token});
    } catch (e) {
      res.status(400).send("error"+e);
    }
  });
 /////////////////~~~~~~~~~~~~Login~~~~~~~~~~~////////////////
  router.post("/user/login", async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email_or_username,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      console.log(e);
      res.status(400).send("error");
    }
  });
 
  //token is put in header [in postman]
  router.delete("/user/logout" ,auth('any'),async (req, res) => {
      try{
      const deleletedToken = await Token.deleteOne({ token: req.token })
      if(!deleletedToken)
      res.status(200).end("Success")
      }
      catch (err) {
      res.status(400).send("error");
      }
  })

  router.delete("/user/logoutall",auth('any'), async (req, res) => {
      try{
      const deltoken = await Token.deleteMany({ 
        userId: req.body.userId
      })
      res.status(200).end("Success")
      
      }
      catch (err) {
      res.status(400).send("error");
    }
  })

      

  module.exports = router 