const express = require("express");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

const router = new express.Router()

  router.get("/:id",auth("any"), async (req, res) => {
    try {
      let user=await User.findById(req.params.id)
  
    

      if(!user){
        throw new Error("no user found")
      }
      if(user.location.visability===false)
       { user.Location=undefined;}
       if(user.birthDate.visability===false)
       { user.birthDate=undefined;}
        user.ban=undefined
        user.email=undefined
        user.Notificationssetting=undefined

        console.log("🚀 ~ file: profilerouter.js ~ line 30 ~ router.get ~ user.following", user.following)

        console.log("🚀 ~ file: profilerouter.js ~ line 30 ~ router.get ~ req.user.following", req.user.following)
        const isfollowed=req.user.following.some(followed=>followed.followingId.toString()==user._id.toString())
        if(isfollowed){
          user.isfollowing=true
        }else{
          user.isfollowing=false
        }
      
      res.send({user,isfollowing:true});
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.get("/:id/me",auth("user"), async (req, res) => {
    try {
      res.send(req.user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.put("/:id/password", auth("user"), async (req, res) => {
    try {
      const ismatch=await bcrypt.compare(req.body.currentPassword,req.user.password)
    
      if(!ismatch)
      { throw new Error("no wrong pass")}
        req.user.password=req.body.newPassword
      await req.user.save();
      res.send(req.user);
    } catch (e) {
      res.status(400);
      res.send({error: e.toString()});
    }
  });
  router.put("/:id", auth("user"), async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const vdata=["birth"]
      const isvalidoperation2 = updates.every((update) =>
      vdata.includes(update)
    );
    console.log(req.body.birth)
    if(req.body.birth&&req.user.birth.visability){
      req.user.birth.visability=req.body.birth.visability
      console.log('1')
    }
    else if(req.body.location&&req.body.location.visability){
      req.user.location.visability=req.body.location.visability
    }else if(req.body.location&&req.body.location.place){
      req.user.location.place=req.body.location.place
    }
    else{
      const allowtoupdate = ["screenName", "tag", "isPrivate", "website",,"Notificationssetting","location","Biography","phoneNumber","darkMode"];
      const isvalidoperation = updates.every((update) =>
        allowtoupdate.includes(update)
      );
    
      if (!isvalidoperation) {
        throw new Error("you can not change this data");
      }

      updates.forEach((element) => (req.user[element] = req.body[element]));
    }
     
      
      await req.user.save();
  
      res.send(req.user);
    } catch (e) {
      res.status(400);
      res.send({error:e.toString()});
    }
  });
  router.put("/:id/avater",auth("any"),upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("no imge found")
            }
      // Delete image from cloudinary
      if(req.user.profileAvater.cloudnaryId)
      {await cloudinary.uploader.destroy(req.user.profileAvater.cloudnaryId);}
      
      // Upload image to cloudinary
       const result = await cloudinary.uploader.upload(req.file.path);
       if(!result.secure_url||!result.public_id){
        throw new Error("can not upload")
       }
       req.user.profileAvater.url=result.secure_url
       req.user.profileAvater.cloudnaryId=result.public_id
       
       await req.user.save()
      res.json(req.user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.delete("/:id/avater",auth("any"), async (req, res) => {
    try {
      // Delete image from cloudinary
      if(req.user.profileAvater.cloudnaryId)
      {await cloudinary.uploader.destroy(req.user.profileAvater.cloudnaryId);}
       req.user.profileAvater=null
       await req.user.save()
      res.json(req.user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.put("/:id/banner",auth("any"),upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("no imge found")
      }
      // Delete image from cloudinary
      if(req.user.banner.cloudnaryId)
      {await cloudinary.uploader.destroy(req.user.banner.cloudnaryId);}
      
      // Upload image to cloudinary
       const result = await cloudinary.uploader.upload(req.file.path);
       if(!result.secure_url||!result.public_id){
        throw new Error("can not upload")
       }
       req.user.banner.url=result.secure_url
       req.user.banner.cloudnaryId=result.public_id
       
       await req.user.save()
      res.json(req.user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.delete("/:id/banner",auth("any"), async (req, res) => {
    try {
      // Delete image from cloudinary
      if(req.user.banner.cloudnaryId)
      {await cloudinary.uploader.destroy(req.user.banner.cloudnaryId);}
       req.user.banner=null
       await req.user.save()
      res.json(req.user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });

  module.exports = router 
  
