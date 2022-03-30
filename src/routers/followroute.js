const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = new express.Router();
    //~~~~~~~~~~~~~~~follow~~~~~~~~~~~~~~//
  router.post("/follow/:id",auth('user'), async (req, res) => {
    const user=await User.findById(req.params.id)
    try {
      user.followercount++
      await user.save()
    
      req.user.following=req.user.following.concat({followingId:user._id})
      req.user.followedcount++
      await req.user.save()
  
      const n=req.user
      res.send({ user,n});
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
    //~~~~~~~~~~~~~~~unfollow~~~~~~~~~~~~~~//
  router.post("/unfollow/:id", auth('user'), async (req, res) => {
    const user=await User.findById(req.params.id)
    try {
  
      req.user.following = req.user.following.filter((follow) => {
        return follow.followingID != req.userID;
      });
      
      await req.user.save();
      res.send("user");
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  
  
  router.get("/following/:id",auth('user'), async (req, res) => {
    const user=await User.findById(req.params.id)
  
    try {
      await user.populate({
        path: "following.followingId",
      });
      console.log(user.following[0].followingId);
      user.following.map(follow=>{
        console.log('1');
         follow.followingId.password=''
        console.log( follow.followingId.password)
  
      })
      // if(user.following.userId.password){
      //    user.following.userId.password=''
      //    user.following.userId.tokens=''}
       
      res.send(user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.get("/follower/:id",auth('user'), async (req, res) => {
    const user=await User.findOne({ _id:req.params.id})
    try {
      await user.populate( {
        path: "follower",
      });
      
      console.log(user);
      
      res.send({ user});
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  
  
  
  module.exports = router
  