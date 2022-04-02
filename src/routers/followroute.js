const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = new express.Router()

//*follow rout
  router.post("/user/:userId/follow/:id",auth("user"), async (req, res) => {
  
    try {
      //you can not follow your self
      if(req.params.id.toString()===req.user._id)
      {
        throw new Error("you can not follow your self ")
      }
      //find user
      const user=await User.findById(req.params.id)
      //if no user
      if(!user){
        throw new Error("no user found")
      }
      //*check if you already follow the user
      const isfollow=await User.findOne({_id:req.user._id},{following:{followingId:user._id}})

      if(isfollow.following.length>0)
      {
        throw new Error("no user found") 
      }
      //*add to user following 
      req.user.following=req.user.following.concat({followingId:user._id})
      req.user.followedcount++
      await req.user.save()
      user.followercount++
      await user.save()
      res.send(req.user.following);
    } catch (e) {

      res.status(400).send({error:e.toString()});
    }
  });
  //*unfollow ROUT
  router.post("/user/:userId/unfollow/:id", auth("user"), async (req, res) => {
   
   
    try {
      const user=await User.findById(req.params.id)
      //if no user
        if(!user){
          throw new Error("no user found")
        }
        const lengthBefore=req.user.following.length
       
      req.user.following = req.user.following.filter((follow) => {
        return follow.followingId == user._id;
      });
     
      const lengthAfter=req.user.following.length
 
      //*if you already unfollow user
      if(lengthAfter===lengthBefore){
        throw new Error("you already unfollow that user")
      }

       req.user.followedcount= req.user.followedcount-1
      await req.user.save()
      user.followercount=user.followercount-1
      await user.save()
      res.send({sccuss:true});
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  //*get users you follow
  router.get("/user/:id/following",auth("user"), async (req, res) => {

    try {
      
     const user=await User.findById(req.params.id)
     //*populate follower data
      await user.populate({
        path: "following.followingId",
        select: '_id screenName tag followercount followingcount',
        options:{
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
        }
      });
        //to check if you follow the user or not
        
        if(!user.following.length<1){
       user.following=user.following.map(follow=>{
        const isfollowed=req.user.following.some(followed=>followed.followingId.toString()==follow.followingId._id.toString())
        if(isfollowed){
          follow={...follow._doc,isfollowing:true}
         return follow
        }else{
          follow={...follow._doc,isfollowing:false}
          return follow
        }
      })}
      res.send(user.following);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  //* to get who follow you
  router.get("/user/:id/follower",auth("user"), async (req, res) => {

    
    try {
      const user=await User.findOne({ _id:req.params.id})
      await user.populate( {
        path: "follower",
        select: '_id screenName tag followercount followingcount',
        options:{
          limit: parseInt(req.query.limit), //to limit number of user 
          skip: parseInt(req.query.skip),   
        }
      });
        //to check if you follow the user or not
        if(!user.follower.length<1){
           
        
      user.follower=user.follower.map(follow=>{
        const isfollowed=user.following.some(followed=>followed.followingId.toString()==follow._id.toString())
        if(isfollowed){
          follow={...follow._doc,isfollowing:true}
         return follow
        }else{
          follow={...follow._doc,isfollowing:false}
          return follow
        }
      })}
      res.send(user.follower);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  
  module.exports = router 
  