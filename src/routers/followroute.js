const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Notification = require("../models/Notification");
const notifiy = require("../utils/firbase");
const Token = require("../models/Token.js");
const PrivateRequest=require('../models/PrivateRequest')
const router = new express.Router();

//*follow rout
router.post("/user/:userId/follow/:id", auth("user"), async (req, res) => {
  try {
    //you can not follow your self
    if (req.params.id.toString() == req.user._id.toString()) {
      throw new Error("you can not follow your self ");
    }

    //find user
    const user = await User.findById(req.params.id);
    //if no user
    if (!user) {
      throw new Error("no user found");
    }
    //*check if you already follow the user

    const isfollowed = req.user.following.some(
      (followed) => followed.followingId.toString() === req.params.id
    );
    if (isfollowed) {
      throw new Error("you already follow the user");
    }
    //*check private
    if (user.isPrivate) {
      const private3 = await PrivateRequest.find({
        requestUser: req.user._id,
        userId: user._id,
      });
    
      if (private3.length === 1) {
        throw new Error("you already request the PrivateRequest");
      }
      console.log('first')
      const private2 = new PrivateRequest({
        requestUser: req.user._id,
        userId: user._id,
      });
      await private2.save()
       
    const text = req.user.screenName+" sent you a follow request";
    const notifications = new Notification({ userId: req.user._id, text,notifiedUId:req.params.id });
    notifications.save();
    const tokens = await Token.find({ ownerId: req.params.id });
    console.log(
      "🚀 ~ file: followroute.js ~ line 43 ~ router.post ~ tokens",
      tokens
    );
    if (tokens) {
      let fcmtokens = tokens.map((token) => token.fcmToken);
      var uniqueArray = [...new Set(fcmtokens)];
      uniqueArray = uniqueArray.filter((t) => t != null);
      console.log(
        "🚀 ~ file: followroute.js ~ line 46 ~ router.post ~ uniqueArray",
        uniqueArray
      );
      console.log(
        "🚀 ~ file: followroute.js ~ line 87 ~ router.post ~ text",
        text
      );

      notifiy(uniqueArray, text, req.user.tag);
    }
      return res.send({ ispending: true });
    }
    //return res.send({ sccuss: true });
    //*add to user following
    req.user.following = req.user.following.concat({ followingId: user._id });
    req.user.followingcount++;
    await req.user.save();
    user.followercount++;
    await user.save();
    if (user.Notificationssetting.newfollow) {
      const text = req.user.screenName+" started following you";
      const notifications = new Notification({ userId: req.user._id, text,notifiedUId:req.params.id });
      notifications.save();
      const tokens = await Token.find({ ownerId: req.params.id });
      console.log(
        "🚀 ~ file: followroute.js ~ line 43 ~ router.post ~ tokens",
        tokens
      );
      if (tokens) {
        let fcmtokens = tokens.map((token) => token.fcmToken);
        var uniqueArray = [...new Set(fcmtokens)];
        uniqueArray = uniqueArray.filter((t) => t != null);
        console.log(
          "🚀 ~ file: followroute.js ~ line 46 ~ router.post ~ uniqueArray",
          uniqueArray
        );
        console.log(
          "🚀 ~ file: followroute.js ~ line 87 ~ router.post ~ text",
          text
        );

        notifiy(uniqueArray, text, req.user.tag);
      }
    }
    res.send({ sccuss: true });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/privateRequest", auth("any"), async (req, res) => {
  try {

    const privateRequest = await PrivateRequest.find({
      userId: req.user._id,
    }).populate({
      path: "requestUser",
      select:
        "_id screenName tag followercount followingcount profileAvater.url Biography",})
    res.send(privateRequest);
  
  }catch (e) {
    res.status(400).send({ error: e.toString() });
  }
})
router.get("/acceptRequest/:id", auth("any"), async (req, res) => {
  try {
    
    const user = await User.findById(req.params.id);
    if(!user){
      throw new Error("no user found");
    }
    const privateRequest2 = await PrivateRequest.find({
      userId: req.user._id.toString(),
      requestUser:req.params.id
    });
    const privateRequest = await PrivateRequest.deleteMany({
      userId: req.user._id.toString(),
      requestUser:req.params.id
    });
    if(privateRequest.deletedCount==0){
      throw new Error("no user found");
    }
    user.following = user.following.concat({ followingId: req.user._id });
    user.followingcount++;
    await user.save();
    req.user.followercount++;
    await req.user.save();
    res.send({ sccuss: true });
  }catch (e) {
    res.status(400).send({ error: e.toString() });
  }
})
router.get("/denyRequest/:id",auth("any"),async (req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    //if no user
    if (!user) {
      throw new Error("no user found");
    }
    const private3 = await PrivateRequest.find({
      userId: req.user._id.toString(),
      requestUser:req.params.id
    });
    if (private3.length === 1) {
      const private3 = await PrivateRequest.deleteOne({
        userId: req.user._id.toString(),
      requestUser:req.params.id
      });
      return res.send({ispending:false});
    }
  }catch (e){
    res.status(400).send({ error: e.toString() });
  }
})
//*unfollow ROUT
router.post("/user/:userId/unfollow/:id", auth("user"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //if no user
    if (!user) {
      throw new Error("no user found");
    }
    const private3 = await PrivateRequest.find({
      requestUser: req.user._id,
      userId: user._id,
    });
    if (private3.length === 1) {
      const private3 = await PrivateRequest.deleteOne({
        requestUser: req.user._id,
        userId: user._id,
      });
      return res.send({ ispending: false });
    }
    const lengthBefore = req.user.following.length;

    //*unfollow
    req.user.following = req.user.following.filter((follow) => {
      return follow.followingId != req.params.id;
    });
    const lengthAfter = req.user.following.length;

    //*if you already unfollow user
    if (lengthAfter === lengthBefore) {
      throw new Error("you already unfollow that user");
    }
    req.user.followingcount = req.user.followingcount - 1;
    await req.user.save();
    user.followercount = user.followercount - 1;
    await user.save();

    res.send({ sccuss: true });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
//*get users you follow
router.get("/user/:id/following", auth("user"), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user.following = user.following.reverse();
    //*populate follower data
    await user.populate({
      path: "following.followingId",

      select:
        "_id screenName tag followercount followingcount profileAvater.url Biography  ",
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      },
    });
    //to check if you follow the user or not
    user.following = user.following.filter((follow) => {
      return follow.followingId != null;
    });

    let checkedfollower = [];
    let i = -1;
    if (!user.following.length < 1) {
      user.following = user.following.map((follow) => {
        i++;
        isfollowed = req.user.following.some(
          (followed) =>
            followed.followingId.toString() == follow.followingId._id.toString()
        );
        if (isfollowed) {
          const userFollower = { ...follow, isfollowing: true };
          checkedfollower[i] = { ...follow._doc, isfollowing: true };
          return userFollower;
        } else {
          checkedfollower[i] = { ...follow._doc, isfollowing: false };

          const userFollower = { ...follow._doc, isfollowing: false };
          return userFollower;
        }
      });
    }

    let privateRequest = await PrivateRequest.find({
      requestUser: req.user._id,
    });

    privateRequest = privateRequest.map((request) => {
      return request.userId.toString();
    });
    
    checkedfollower=checkedfollower.map(follow=>{

    
    if (privateRequest.includes(follow.followingId._id.toString())) {
      const ispending = true;
      const followingId=follow.followingId

      return ({ ispending,isfollowing:follow.isfollowing, followingId:follow.followingId });
    }else{
      const ispending = false;
      return ({ ispending,isfollowing:follow.isfollowing,followingId:follow.followingId });
  }})

    res.send(checkedfollower);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
//* to get who follow you
router.get("/user/:id/follower", auth("user"), async (req, res) => {
  try {
    const sort = [{ createdAt: -1 }];
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const user = await User.findOne({ _id: req.params.id });
    await user.populate({
      path: "follower",
      select:
        "_id screenName tag followercount followingcount profileAvater.url Biography",
      options: {
        limit: parseInt(limit), //to limit number of user
        skip: parseInt(skip),
        sort,
      },
    });
    //to check if you follow the user or not
    if (!user.follower.length < 1) {
      user.follower = user.follower.map((follow) => {
        const isfollowed = req.user.following.some(
          (followed) => followed.followingId.toString() == follow._id.toString()
        );
        delete follow._doc.following;
        if (isfollowed) {
          userFollower = { ...follow._doc, isfollowing: true };
          return userFollower;
        } else {
          userFollower = { ...follow._doc, isfollowing: false };
          return userFollower;
        }
      });
    }
    let privateRequest = await PrivateRequest.find({
      requestUser: req.user._id,
    });

    privateRequest = privateRequest.map((request) => {
      return request.userId.toString();
    });
    user.follower=user.follower.map(follow=>{

    
    if (privateRequest.includes(follow._id.toString())) {
      const ispending = true;
      follow.ispending=ispending
      return (follow);
    }else{
      const ispending = false;
      follow.ispending=ispending
      return (follow);
  }})
    res.send(user.follower);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});

module.exports = router;
