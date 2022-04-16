const express = require("express");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

const router = new express.Router()

//*follow rout
  router.get("/:id",auth("any"), async (req, res) => {
    try {
      const user=await User.findById(req.params.id)
      if(!user){
        throw new Error("no user found")
      }
      if(user.Location.visability===false)
       {delete user.Location.console.Location;}
       if(user.birthDate.visability===false)
       {delete user.Location.console.birthDate;}
       delete userobject.ban
       delete userobject.email
       delete userobject.Notificationssetting
      res.send(user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.get("/me",auth("user"), async (req, res) => {
    try {
      const user=await User.findById(req.user._id)
      if(!user){
        throw new Error("no user found")
      }
      res.send(user);
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
  router.put("/:id/password", auth("user"), async (req, res) => {
    try {
      const ismatch=await bcrypt.compare(req.body.currentPassword,req.user.password)
    
      if(!ismatch)
      { throw new Error("no user found")}
        req.user.password=req.body.newPassword
      await req.user.save();
      res.send(req.user);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  });
  router.put("/:id", auth("user"), async (req, res) => {
    try {

      const updates = Object.keys(req.body);
      const allowtoupdate = ["screenName", "tag", "isPrivate", "birthDate","Notificationssetting","Location"];
      const isvalidoperation = updates.every((update) =>
        allowtoupdate.includes(update)
      );
    
      if (!isvalidoperation) {
        return res.status(400).send("error in update");
      }

      updates.forEach((element) => (req.user[element] = req.body[element]));
      await req.user.save();
  
      res.send(req.user);
    } catch (e) {
      res.status(400);
      res.send(e);
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
  