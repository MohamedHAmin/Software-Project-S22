const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = new express.Router()

  
  ////~~~~~~~~~~~~~~~follow~~~~~~~~~~~~~~/////
  router.post("/user/:userId/follow/:id",auth("user"), async (req, res) => {
    const user=await User.findById(req.params.id)
    try {
      if(!user){
        throw new Error("no user found")
      }
      user.followercount++
      await user.save()
      req.user.following=req.user.following.concat({followingId:user._id})
      req.user.followedcount++
      await req.user.save()
      const n=req.user
      res.send({ user});
    } catch (e) {

      res.status(400).send({error:e});
    }
  });
  ///////////***unfollow */
  router.post("/user/:userId/unfollow/:id", auth("user"), async (req, res) => {
   
    const user=await User.findById(req.params.id)
    try {
        if(!user){
          throw new Error("no user found")
        }
      req.user.following = req.user.following.filter((follow) => {
        return follow.followingId != user._id;
      });
      await req.user.save();
      res.send("user");
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  
  router.get("/user/:id/following",auth("user"), async (req, res) => {

    const user=await User.findById(req.params.id)
    try {
      await user.populate({
        path: "following.followingId",
        select: 'userId screenName'
      });
     
      res.send(user.following);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });

  router.get("/user/:id/follower",auth("user"), async (req, res) => {

    const user=await User.findOne({ _id:req.params.id})
    try {
      await user.populate( {
        path: "follower",
        select: '_id screenName tag followercount followingcount',
        options:{
          limit: parseInt(req.query.limit),

          skip: parseInt(req.query.skip),
        }
      });
      
      res.send(user.follower);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  
  
  
  module.exports = router 
  