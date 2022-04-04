const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = new express.Router()

//*follow rout
  router.get("/user/:id",auth("any"), async (req, res) => {
    try {
      const user=await User.findById(req.params.id)
      if(!user){
        throw new Error("no user found")
      }
      res.send(user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });

  module.exports = router 
  