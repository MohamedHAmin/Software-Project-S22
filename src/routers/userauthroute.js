const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const Token = require("../models/Token")
const router = new express.Router()
const methodOverride = require('method-override')
            //~~~~~~~~~~~~Signup~~~~~~~~~~~//
router.post("/signup",async (req, res) => {
  
    const user = new User(req.body);
    try {
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
      console.log(e);
      res.status(400).send({ error: e.toString() });
    }
  });
 
  //token is put in header [in postman]
  router.delete("/logout" ,auth('any'),async (req, res) => {
      try{
        console.log(req.token)
      await Token.deleteMany({ token: req.token })
   
      res.status(200).end("Success")}
      
      
      catch (e) {
      res.status(400).send({ error: e.toString() });
      }
  })

  router.delete("/logoutall",auth('any'), async (req, res) => {
      try{
      await Token.deleteMany({ 
        ownerId: req.body.ownerId
      })
      res.status(200).end("Success")
      
      }
      catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  })

      

  module.exports = router 