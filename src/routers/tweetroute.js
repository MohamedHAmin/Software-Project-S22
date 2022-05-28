const express = require("express");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../models/User");
const PrivateRequest = require("../models/PrivateRequest");
const mongoose = require("mongoose");
const fs = require("fs");
const Notification = require("../models/Notification");
const notifiy = require("../utils/firbase");
const Token = require("../models/Token.js");
const router = new express.Router();
//! remember to require and install badwords
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const filter = require("../ethics/bad_words");
const Tweet = require("../models/Tweet");
const res = require("express/lib/response");

router.get("/tweet/:id", auth("any"), async (req, res) => {
  try {
    //gets tweet ID from route parameter /:id
    //and searches for respective tweet
  
    let tweet = await Tweet.findById(req.params.id);
 
    let sentTweet;
    if (!tweet) {
      e = "tweet not found";
      throw e;
    }

    if (tweet.text === " "||tweet.text === "") {
      //in case you get a tweet with this place holder in its text path
      //replace it with null
      //! you will only get no text in case of retweet
      tweet.text = "";
    }

    await tweet.populate({
      path: "authorId",
      select: "_id screenName tag isPrivate profileAvater.url",
    });
    await tweet.populate({
      path: "retweetedTweet.tweetId",
      strictPopulate: false,
      select:
        "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
      populate: {
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag isPrivate profileAvater.url",
      },
    });
    await tweet.populate({
      path: "reply",
      select:
        "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
      strictPopulate: false,
      populate: [
        {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag isPrivate profileAvater.url",
        },
        {
          path: "reply",
          select:
            "_id replyingTo authorId text tags likeCount gallery createdAt",
          strictPopulate: false,
          populate: {
            path: "authorId",
            strictPopulate: false,
            select: "_id screenName tag isPrivate profileAvater.url",
          },
        },
      ],
    });
    replyFilterFunc(req.user,tweet)

    let Retweet = tweet.retweetedTweet;
    let modifiedRetweet = { tweetId: "", tweetExisted: null };
    let replies = tweet.reply;
    let modifiedreply;
    let modifiedreplies = [];

    if (Retweet) {
      if (
        Retweet.tweetId &&
        Retweet.tweetId.likes.length > 0 &&
        Retweet.tweetId.likes
      ) {
        let retweetisliked = tweet.retweetedTweet.tweetId.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        if (retweetisliked) {
          delete Retweet.tweetId._doc.likes;
          modifiedRetweet.tweetId = { ...Retweet.tweetId._doc, isliked: true };
          modifiedRetweet.tweetExisted = Retweet.tweetExisted;
        } else {
          delete Retweet.tweetId._doc.likes;
          modifiedRetweet.tweetId = { ...Retweet.tweetId._doc, isliked: false };
          modifiedRetweet.tweetExisted = Retweet.tweetExisted;
        }
        
      }
      else if (Retweet.tweetId) {
        modifiedRetweet.tweetId = Retweet.tweetId;
        modifiedRetweet.tweetExisted = Retweet.tweetExisted;
      } else {
        modifiedRetweet.tweetId = null;
        modifiedRetweet.tweetExisted = Retweet.tweetExisted;
      }
    }  
    if (replies && replies.length > 0) {
      for (reply of replies) {
        let replyisliked = reply.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        if (replyisliked) {
          delete reply.likes;
          modifiedreply = { ...reply._doc, isliked: true };
          modifiedreplies.push(modifiedreply);
        } else {
          delete reply.likes;
          modifiedreply = { ...reply._doc, isliked: false };
          modifiedreplies.push(modifiedreply);
        }
      }
    }

    if (tweet.replyingTo.tweetExisted) {
      let temp = await Tweet.findById(tweet.replyingTo.tweetId);
      if (!temp) {
        tweet.replyingTo.tweetId = null;
      }
    }

   

    let isliked = tweet.likes.some(
      (like) => like.like.toString() == req.user._id.toString()
    );
    if (isliked) {
      delete tweet._doc.likes;
      sentTweet = {
        ...tweet._doc,
        isliked: true,
        reply: modifiedreplies,
        retweetedTweet: modifiedRetweet,
      };
    } else {
      delete tweet._doc.likes;
      sentTweet = {
        ...tweet._doc,
        isliked: false,
        reply: modifiedreplies,
        retweetedTweet: modifiedRetweet,
      };
    }
    res.send(sentTweet);
  } catch (e) {
    //here all caught errors are sent to the client

    //here for testing purposes if an unhandled error routerears
    res.status(400).send({ error: e.toString() });
  }
});

//tprofile tweets
router.get("/tweet/user/:id", auth("any"), async (req, res) => {
  try {

    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0; //? it defoult get first tweet and not skip any
    const match = { "replyingTo.tweetId":null , "replyingTo.tweetExisted": false };
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      e = "user doesn't exist";
      throw e;
    }
   // if(req.user._id.toString()!=req.params.id){

      const isallowed=await allowView(req.user,req.params.id)
      console.log("🚀 ~ file: tweetroute.js ~ line 187 ~ router.get ~ req.params.id", req.params.id)
      console.log("🚀 ~ file: tweetroute.js ~ line 187 ~ router.get ~ isallowed", isallowed)
   // }
    if(!isallowed){
      e = "not allowed to see his tweet";
      throw e;
    }


    const sort = [{ createdAt: -1 }];
    const tweets = await user.populate({
      path: "Tweets",
      match,
      options: {
        limit: parseInt(limit), //to limit number of user
        skip: parseInt(skip),
      },
      populate: [
        {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag  profileAvater.url",
        },
        {
          //if it is a retweet view content of retweeted tweet
          path: "retweetedTweet.tweetId",
          strictPopulate: false,
          select:
            "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
          populate: {
            path: "authorId",
            strictPopulate: false,
            select: "_id screenName tag profileAvater.url",
          },
        },
         {
           path:"replyingTo.tweetId",
           strictPopulate: true,
           select:"_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
           populate:{
             path: "authorId",
             strictPopulate: false,
             select: "_id screenName tag profileAvater.url",
           },
         },
      ],

      options: { sort },
    });

    if (!user.Tweets.length < 1) {
      user.Tweets = user.Tweets.map((tweet) => {
        const isliked = tweet.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        if (isliked) {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: true,
          };
          return tweets;
        } else {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: false,
          };
          return tweets;
        }
      });
      let temp;
      for (let i = 0; i < user.Tweets.length; i++) {
        if (user.Tweets[i].replyingTo.tweetExisted) {
          temp = await Tweet.findById(user.Tweets[i].replyingTo.tweetId);
          if (!temp) {
            user.Tweets[i].replyingTo.tweetId = null;
          }
        }
      }
    } else {
      e = "user has no tweets";
      throw e;
    }
    res.send(user.Tweets);
  } catch (e) {
    //here all caught errors are sent to the client
    res.status(400).send({ error: e.toString() });
  }
});

router.get("/timeline", auth("any"), async (req, res) => {
  try {

    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0; //? it defoult get first tweet and not skip any
    const match = { "replyingTo.tweetId":null , "replyingTo.tweetExisted": false };
    const followingsId = req.user.following.map((user) => {
      return user.followingId;
    });
    const user = req.user;
  
    followingsId.push(req.user._id);

    let followerTweet = await Tweet.find({ authorId: { $in: followingsId } ,replyingTo:{tweetId:null,tweetExisted:false}})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "retweetedTweet.tweetId",
        strictPopulate: false,
        select:
          "_id replyingTo authorId text tags likeCount retweetCount replyCount gallery likes createdAt",
        populate: {
          path: "authorId",
          strictPopulate: true,
          select: "_id screenName tag profileAvater.url",
        },
      })
      .populate({
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag profileAvater.url",
      })
     
    let i = -1;
    if (!followerTweet.length < 1) {
      followerTweet = followerTweet.map((tweet) => {
        i++;
        const isliked = tweet.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        if (isliked) {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: true,
          };
          return tweets;
        } else {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: false,
          };
          return tweets;
        }
      });
    }
    // let temp;
    // for (let i = 0; i < followerTweet.length; i++) {
    //   if (followerTweet[i].replyingTo.tweetExisted) {
    //     temp = await Tweet.findById(followerTweet[i].replyingTo.tweetId);
    //     if (!temp) {
    //       followerTweet[i].replyingTo.tweetId = null;
    //     }
    //   }
    // }
    res.send(followerTweet);
  } catch (e) {
    //here all caught errors are sent to the client

    //here for testing purposes if an unhandled error routerears
    res.status(400).send({ error: e.toString() });
  }
});

router.get("/search/:searchedtext", auth("any"), async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const filters = { followerfilter: req.query.followerfilter };
    let searchedItem = req.params.searchedtext.trim();
    if (!searchedItem || searchedItem.length < 1) {
      e = "Attempting search of empty string";
      throw e;
    }
    let resultTweets = await Tweet.find({
      text: { $regex: searchedItem, $options: "i" },
      "replyingTo.tweetId": null,
      "replyingTo.tweetExisted": false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "retweetedTweet.tweetId",
        strictPopulate: false,
        select:
          "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
      })
      .populate({
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag isPrivate profileAvater.url",
      });
      console.log("🚀 ~ file: tweetroute.js ~ line 388 ~ router.get ~ resultTweets", resultTweets)
      resultTweets=tweetFilterFunc(req.user,resultTweets);
    let resultUsers = await User.find({
      $or: [
        {tag: { $regex: searchedItem, $options: "i" }},
        {screenName: { $regex: searchedItem, $options: "i" }},
      ],
    })
    .sort({ tag: 1 })
    .limit(limit)
    .skip(skip)
    .select({
      "_id": 1,
      "screenName": 1,
      "tag": 1,
      "profileAvater.url": 1,
      "Biography": 1,
    });
   
    const followingsId = req.user.following.map((user) => {
      return user.followingId.toString();
    });
    let found;
    let modifiedresultUsers = [];
    if (resultUsers.length < 1 && resultTweets.length < 1) {
      e = "no users or tweets found";
      throw e;
    }
    if (resultUsers.length > 0) {
      for (let i = 0; i < resultUsers.length; i++) {
        found = followingsId.includes(resultUsers[i]._id.toString());
        if (found) {
          modifiedresultUsers.push({
            ...resultUsers[i]._doc,
            isfollowed: true,
          });
        } else {
          modifiedresultUsers.push({
            ...resultUsers[i]._doc,
            isfollowed: false,
          });
        }
      }
    }

    let privateRequest = await PrivateRequest.find({
      requestUser: req.user._id,
    });

    privateRequest = privateRequest.map((request) => {
      return request.userId.toString();
    });

    modifiedresultUsers=modifiedresultUsers.map(follow=>{

    
      if (privateRequest.includes(follow._id.toString())) {
        const ispending = true;
        const followingId=follow.followingId
  
        return ({ ispending,...follow });
      }else{
        const ispending = false;
        return ({ ispending,...follow });
    }})
    resultUsers = modifiedresultUsers;

    let temp;
    for (let i = 0; i < resultTweets.length; i++) {
      if (resultTweets[i].replyingTo.tweetExisted) {
        temp = await Tweet.findById(resultTweets[i].replyingTo.tweetId);
        console.log("🚀 ~ file: tweetroute.js ~ line 458 ~ router.get ~ temp", temp)
        if (!temp) {
          resultTweets[i].replyingTo.tweetId = null;
        }
      }
    }
  
    if (filters.followerfilter) {
      modifiedresultUsers = [];
      for (let i = 0; i < resultUsers.length; i++) {
        if (resultUsers[i].isfollowed) {
          modifiedresultUsers.push(resultUsers[i]);
        }
      }
      resultUsers = modifiedresultUsers;
      
      let modifiedresultTweets = [];
     let l=req.user.following.length
      for (let i = 0; i < resultTweets.length; i++) {

        for (let j = 0; j < l; j++) {
  
          if (
            resultTweets[i].authorId._id.toString() == req.user.following[j].followingId.toString()
           
          ) {
            console.log(i)
            modifiedresultTweets.push(resultTweets[i]);
            break;
          }
        }
      }
      resultTweets = modifiedresultTweets;

    }
    if (resultUsers.length < 1 && resultTweets.length < 1) {
      e = "no users or tweets found";
      throw e;
    }
    resultTweets = resultTweets.map((tweet) => {
      const isliked = tweet.likes.some(
        (like) => like.like.toString() == req.user._id.toString()
      );
      if (isliked) {
        delete tweet.likes;
        const tweets = {
          ...tweet._doc,
          isliked: true,
        };
        return tweets;
      } else {
        delete tweet.likes;
        const tweets = {
          ...tweet._doc,
          isliked: false,
        };
        return tweets;
      }
    });
      
    let searchResults = { Tweets: resultTweets, Users: resultUsers };
    res.send(searchResults);
  } catch (e) {
    //here all caught errors are sent to the client
    res.status(400).send({ error: e.toString() });
  }
});


router.get("/profile/likedtweets/:id", auth("user"), async (req, res) => {
  try {
    await req.user.isBanned();
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let requiredId = mongoose.Types.ObjectId(req.params.id);
    let user = await User.findById(req.params.id);
    if (!user) {
      e = "user doesn't exist ";
      throw e;
    }

    let likedtweets = await Tweet.find({ "likes.like": requiredId })
    .populate([
      {
      path: "authorId",
      select: "_id screenName isPrivate tag profileAvater.url",
      },
      {
        path: "retweetedTweet.tweetId",
        select:
          "_id authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
      },
      {
        path: "replyingTo.tweetId",
        select:
          "_id authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag isPrivate profileAvater.url",
        },
      }
    ])
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    if(!req.user._id.equals(req.params.id)){
      likedtweets= tweetFilterFunc(req.user,likedtweets)
    }
    // for (likedtweet of likedtweets) {
    //   await User.populate(likedtweet, {
    //     path: "authorId",
    //     select: "_id screenName tag profileAvater.url",
    //   });
    //   await Tweet.populate(likedtweet, {
    //     path: "retweetedTweet.tweetId",
    //     select:
    //       "_id authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
    //     populate: {
    //       path: "authorId",
    //       strictPopulate: false,
    //       select: "_id screenName tag profileAvater.url",
    //     },
    //   });
    //   await Tweet.populate(likedtweet, {
    //     path: "replyingTo.tweetId",
    //     select:
    //       "_id authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
    //     populate: {
    //       path: "authorId",
    //       strictPopulate: false,
    //       select: "_id screenName tag profileAvater.url",
    //     },
    //   });
    // }
    if (likedtweets.length < 1) {
      e = "no liked tweets found";
      throw e;
    }
    // let modifiedlikedtweets = [];
    // let modifiedlikedtweet;
    // for (likedtweet of likedtweets) {
    //   modifiedlikedtweet = { ...likedtweet, isliked: true };
    //   modifiedlikedtweets.push(modifiedlikedtweet);
    // }
    likedtweets = likedtweets.map((tweet) => {
      const isliked = tweet.likes.some(
        (like) => like.like.toString() == req.user._id.toString()
      );
      if (isliked) {
        delete tweet.likes;
        const tweets = {
          ...tweet._doc,
          isliked: true,
        };
        return tweets;
      } else {
        delete tweet.likes;
        const tweets = {
          ...tweet._doc,
          isliked: false,
        };
        return tweets;
      }
    });

    res.send(likedtweets);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});

router.get("/profile/replies/:id", auth("user"), async (req, res) => {
  try {
  
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0; //? it defoult get first tweet and not skip any
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      e = "user doesn't exist";
      throw e;
    }
    let originalTweets = [];
    let sentTweets = [];
    let notreplies=[];
    const sort = [{ createdAt: -1 }];
    const tweets = await user.populate({
      path: "Tweets",
      options: {
        limit: parseInt(limit), //to limit number of user
        skip: parseInt(skip),
      },
      populate: [
        {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag  profileAvater.url",
        },
        {
          //if it is a retweet view content of retweeted tweet
          path: "retweetedTweet.tweetId",
          strictPopulate: false,
          select:
            "_id replyingTo authorId text tags retweetedTweet likeCount retweetCount gallery likes replyCount createdAt",
          populate: {
            path: "authorId",
            strictPopulate: false,
            select: "_id screenName tag profileAvater.url",
          },
        },
        {
          path: "replyingTo.tweetId",
          strictPopulate: true,
          select:
            "_id replyingTo authorId text tags retweetedTweet likeCount retweetCount gallery likes replyCount createdAt",
          populate: {
            path: "authorId",
            strictPopulate: false,
            select: "_id screenName tag isPrivate profileAvater.url",
          },
        },
      ],

      options: { sort },
    });
    if (!user.Tweets.length < 1) {
      user.Tweets = user.Tweets.map((tweet) => {
        const priv=reptoFilterFunc(req.user,tweet);
        if(priv){return priv;}
        const isliked = tweet.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        if (isliked) {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: true,
          };
          return tweets;
        } else {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: false,
          };
          return tweets;
        }
      });
      const UserTweets = user.Tweets;
      let temp;
      for (let i = 0; i < user.Tweets.length; i++) {
        if (user.Tweets[i].replyingTo.tweetExisted) {
          temp = await Tweet.findById(user.Tweets[i].replyingTo.tweetId);
          if (!temp) {
            user.Tweets[i].replyingTo.tweetId = null;
          }
        }
      }
      let UserReplies = [];
      for (UserTweet of UserTweets) {
        if (UserTweet.replyingTo.tweetExisted) {
          UserReplies.push(UserTweet);
        }
      }
      if (UserReplies.length > 0) {
        for (UserReply of UserReplies) {
          if (UserReply.replyingTo.tweetId) {
            originalTweets.push(UserReply.replyingTo);
            delete originalTweets.replyingTo;
          } else {
            originalTweets.push(UserReply.replyingTo);
          }
        }
        for (let i = 0; i < UserReplies.length; i++) {
          originalTweets[i] = {
            ...originalTweets[i],
            reply: UserReplies[i],
          };
        }
      }
    } else {
      e = "user has no tweets";
      throw e;
    }
    for (let i = 0; i < user.Tweets.length; i++) {
      if (
        user.Tweets[i].replyingTo.tweetId === null &&
        user.Tweets[i].replyingTo.tweetExisted === false
      ) {
        sentTweets.push({tweetId:user.Tweets[i]});
      }
    }
    for (let i = 0; i < originalTweets.length; i++) {
      sentTweets.push(originalTweets[i]);
    }

    res.send(sentTweets);
  } catch (e) {
    //here all caught errors are sent to the client
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/profile/media/:id", auth("user"), async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let user = await User.findById(req.params.id);
    if (!user) {
      e = "user doesn't exist";
      throw e;
    }
    const isallowed=await allowView(req.user,req.params.id)
    if(!isallowed){
      e = "not allowed to see his tweet";
      throw e;
    }
    let userTweetsWithImages = await Tweet.find({
      authorId: req.params.id,
      gallery: { $ne: [], $type: "array" },
    })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "authorId",
        select: "_id screenName tag profileAvater.url",
      })
      .populate({
        path: "retweetedTweet.tweetId",
        strictPopulate: false,
        select:
          "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
      });

    if (userTweetsWithImages.length < 1) {
      e = "no tweets with images found";
      throw e;
    }
    for (let i = 0; i < userTweetsWithImages.length; i++) {
      if (userTweetsWithImages[i].replyingTo.tweetExisted) {
        temp = await Tweet.findById(userTweetsWithImages[i].replyingTo.tweetId);
        if (!temp) {
          userTweetsWithImages[i].replyingTo.tweetId = null;
        }
      }
    }
    let i=-1
    if (!userTweetsWithImages.length < 1) {
      userTweetsWithImages = userTweetsWithImages.map((tweet) => {
        i++;
        const isliked = tweet.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        if (isliked) {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: true,
          };
          return tweets;
        } else {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: false,
          };
          return tweets;
        }
      });
    }
    
    
    res.send(userTweetsWithImages);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});


router.get("/explore", auth("any"), async (req, res) => {
  try {

    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0; //? it defoult get first tweet and not skip any

    const followingsId = req.user.following.map((user) => {
      return user.followingId;
    });
    // const user = req.user;

    followingsId.push(req.user._id);

    let exploredTweet = await Tweet.find({
      authorId: { $nin: followingsId, $ne: req.user._id },
      "replyingTo.tweetId": null,
      "replyingTo.tweetExisted": false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "retweetedTweet.tweetId",
        strictPopulate: false,
        select:
          "_id replyingTo authorId text tags likeCount retweetCount replyCount gallery likes createdAt",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
      })
      .populate({
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag isPrivate profileAvater.url",
      })
      exploredTweet=tweetFilterFunc(req.user,exploredTweet);
    let i = -1;
    if (!exploredTweet.length < 1) {
      exploredTweet = exploredTweet.map((tweet) => {
        i++;
        const isliked = tweet.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        if (isliked) {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: true,
          };
          return tweets;
        } else {
          delete tweet._doc.likes;
          const tweets = {
            ...tweet._doc,
            isliked: false,
          };
          return tweets;
        }
      });
    }
    // for (let i = 0; i < exploredTweet.length; i++) {
    //   if (exploredTweet[i].replyingTo.tweetExisted) {
    //     temp = await Tweet.findById(exploredTweet[i].replyingTo.tweetId);
    //     if (!temp) {
    //       exploredTweet[i].replyingTo.tweetId = null;
    //     }
    //   }
    // }
    res.send(exploredTweet);
  } catch (e) {
    //here all caught errors are sent to the client

    //here for testing purposes if an unhandled error routerears
    res.status(400).send({ error: e.toString() });
  }
});

router.post("/tweet", auth("user"), upload.array("image"), async (req, res) => {
  //Creates a new tweet with the json data that the user sends
  // through req.body
  try {
    await req.user.isBanned();
    let text = req.body.text;
    let texttrimmed;
    //text attribute of the post is trimmed (remove whitespaces from both sides of strong)
    //then put in a variable called text for ease of use
    if (!text) {
      //checks if user sent Text parameter empty
      //if true the post will be rejected and sends an error
      e = "Empty Post";
      throw e;
    } else {
      texttrimmed = req.body.text;
    }
    if (texttrimmed.length > 280) {
      //checks if post exceeded 280 characters
      //if true post will be rejected
      e = "Post exceeds max length";
      throw e;
    }

    if (filter.isProfane(texttrimmed) == true) {
      //checks if user has a blacklisted word in their post
      //if true post will be rejected and sends an error
      //? I'm still using facebook's blacklist for bad words,
      //? should i rely on it and accept the performance issues that string list
      //? this big might cause or rely on bad words default smaller list?
      e = "bad word";
      throw e;
    }
     // ["ahmed",mohamed ,ziad]
   let tags=req.body.tags
    let realTags=[]
    //tags array are put in variable called tags for ease of use
    //if tags is null or an empty error we assume that there is
    //no tags in this post
    if(Array.isArray(req.body.tags)){
    
    if (tags && tags.length != 0 && tags.length > 10) {
      //if tags are not a null and not an empty list but
      //exceeds 10 tags refuse this post and send an error
      e = "tags exceeded limit";
      throw e;
    } 
    else if (tags && tags.length != 0 && tags.length <= 10) {
      //if tags are not a null and don't exceed 10 tags then
      //then enter a loop on all tag object inside tags
      let counter=0
      for (let i = 0; i < tags.length; i++) {
       
        if (!tags[i] || tags[i].trim().length === 0) {
          //if tag is "" (empty) or null remove it from array
          //and decrease index of loop
          realTags.splice(i, 1);
          i--;
        }else{

          realTags.push({tag:tags[i]})
          counter++
        }

      }
    }}else{
      if(tags){
      if(tags.slice(0,1)==="@"){
          realTags.push({tag:tags}) 
        }
        
      }}
      console.log("🚀 ~ file: tweetroute.js ~ line 867 ~ router.post ~ realTags", realTags)
    if (req.body.imageCheck === "true") {
      // const uploader = (path) => cloudinary.uploads(path, "Images");
      const urls = [];
      const files = req.files;
      if (files.length > 4) {
        e = "Image limit exceeded";
        throw e;
      }
      for (const file of files) {
        const path = file.path;
        const newPath = await cloudinary.uploader.upload(path);
        const newUrl = { photo: newPath.secure_url };
        urls.push(newUrl);
        fs.unlinkSync(path);
        if (urls.length > 4) {
          e = "Image limit exceeded";
          throw e;
        }
      }
      delete req.body.imageCheck;
      await Tweet.create({
        ...req.body,
        authorId: req.user._id,
        tags:realTags,
        gallery: urls,
      });
    } else {
      await Tweet.create({ ...req.body,tags:realTags, authorId: req.user._id });
    }
      const nottext=req.user.tag+" posted a new lar"
      const tagtext="@"+req.user.tag+" mentioned you in his lar"
      console.log("🚀 ~ file: tweetroute.js ~ line 902 ~ router.post ~ tagtext", tagtext)

      console.log("🚀 ~ file: tweetroute.js ~ line 905 ~ router.post ~ realTags", realTags)
      notifiy(req.user,nottext,req.user.tag,"newtweet",realTags,tagtext)
      console.log("🚀 ~ file: tweetroute.js ~ line 905 ~ router.post ~ tagtext", tagtext)
  

    res.status(200).send({ AddedTweetStatus: "Tweet Stored" });
  } catch (e) {
    //here all exception caught sends their respective
    //error according to failed test

    res.status(400).send({ error: e.toString() });
  }
});

router.post("/retweet", auth("user"), async (req, res) => {
  try {
    await req.user.isBanned();
    //same as creating a new tweet but has an added retweet that
    //also increases the retweet count on the original tweet
    const Retweetedtweet = await Tweet.findById(req.body.retweetedTweet);
    if (!Retweetedtweet) {
      e = "Retweeted tweet does not exist";
      throw e;
    }
    Retweetedtweet.retweetCount++;
    let text = req.body.text;
    //text attribute of the post is trimmed (remove whitespaces from both sides of strong)
    //then put in a variable called text for ease of use

    if (!text || text.length == 0) {
      //in case of retweet with no text replace here place holder to be
      //removed while getting

      text = " ";
    } else {
      text = req.body.text.trim();
    }

    if (text.length > 280) {
      //checks if post exceeded 280 characters
      //if true post will be rejected
      e = "Post exceeds max length";
      throw e;
    }

    if (filter.isProfane(text) == true) {
      //checks if user has a blacklisted word in their post
      //if true post will be rejected and sends an error
      e = "bad word";
      throw e;
    }

    let tags = req.body.tags;
    //tags array are put in variable called tags for ease of use
    //if tags is null or an empty error we assume that there is
    //no tags in this post
    if (tags && tags.length != 0 && tags.length > 10) {
      //if tags are not a null and not an empty list but
      //exceeds 10 tags refuse this post and send an error
      e = "tags exceeded limit";
      throw e;
    }
    //if text passed through all tests creates a new entry in the database
    //and sends an OK status message to the client
    await Retweetedtweet.save();
    const tweet = await Tweet.create({
      ...req.body,
      authorId: req.user._id,
      text: text,
      retweetedTweet: { tweetId: req.body.retweetedTweet, tweetExisted: true },
    });
    const nottext=req.user.tag+" has relar"
    const tagtext="@"+req.user.tag+" mentioned you in his relar"
    console.log("🚀 ~ file: tweetroute.js ~ line 974 ~ router.post ~ tagtext", tagtext)

    notifiy(req.user,nottext,req.user.tag,"newtweet",req.body.tags,tagtext)

    res.status(200).send({ AddedTweetStatus: "Retweet Stored" }).end();
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});

router.post("/reply", auth("user"), upload.array("image"), async (req, res) => {
  try {
    await req.user.isBanned();
    // let replyingTo=req.body.replyingTo;
    // if (typeof req.body.replyingTo==="string"){
    //   replyingTo=mongoose.Types.ObjectId(replyingTo);
    // }
    let repliedOnTweet = await Tweet.findById(req.body.replyingTo);
    if (!repliedOnTweet) {
      e = "Error: tweet not found";
      throw e;
    }
    repliedOnTweet.replyCount++;
    let text = req.body.text;
    let texttrimmed;
    //text attribute of the post is trimmed (remove whitespaces from both sides of strong)
    //then put in a variable called text for ease of use

    if (!text && (!req.body.imageCheck || req.body.imageCheck === "false")) {
      //checks if user sent Text parameter empty
      //if true the post will be rejected and sends an error
      e = "Empty Post";
      throw e;
    } else if (!text && req.body.imageCheck === "true") {
      texttrimmed = " ";
    } else {
      texttrimmed = req.body.text.trim();
    }

    if (text && texttrimmed.length > 280) {
      //checks if post exceeded 280 characters
      //if true post will be rejected
      e = "Post exceeds max length";
      throw e;
    }

    if (text && filter.isProfane(texttrimmed) == true) {
      //checks if user has a blacklisted word in their post
      //if true post will be rejected and sends an error
      e = "bad word";
      throw e;
    }

    let tags = req.body.tags;
    //tags array are put in variable called tags for ease of use
    //if tags is null or an empty error we assume that there is
    //no tags in this post
    if (tags && tags.length != 0 && tags.length > 10) {
      //if tags are not a null and not an empty list but
      //exceeds 10 tags refuse this post and send an error
      e = "tags exceeded limit";
      throw e;
    } else if (tags && tags.length != 0 && tags.length <= 10) {
      //if tags are not a null and don't exceed 10 tags then
      //then enter a loop on all tag object inside tags
      for (let i = 0; i < tags.length; i++) {
        if (!tags[i].tag || tags[i].tag.trim().length === 0) {
          //if tag is "" (empty) or null remove it from array
          //and decrease index of loop
          tags.splice(i, 1);
          i--;
        } else if (!/\S/.test(tags[i].tag)) {
          //if tag is only whitespaces remove it from array
          //and decrease index of loop
          tags.splice(i, 1);
          i--;
        }
      }
    }
    //if text passed through all tests creates a new entry in the database
    //and sends an OK status message to the client
    await repliedOnTweet.save();
    if (req.body.imageCheck === "true") {
      // const uploader = (path) => cloudinary.uploads(path, "Images");
      const urls = [];
      const files = req.files;
      if (files.length > 4) {
        e = "Image limit exceeded";
        throw e;
      }
      for (const file of files) {
        const path = file.path;
        const newPath = await cloudinary.uploader.upload(path);
        const newUrl = { photo: newPath.secure_url };
        urls.push(newUrl);
        fs.unlinkSync(path);
        if (urls.length > 4) {
          e = "Image limit exceeded";
          throw e;
        }
      }
      delete req.body.imageCheck;
      const tweet = await Tweet.create({
        ...req.body,
        authorId: req.user._id,
        text: texttrimmed,
        gallery: urls,
        replyingTo: { tweetId: req.body.replyingTo, tweetExisted: true },
      });
    } else {
      const tweet = await Tweet.create({
        ...req.body,
        authorId: req.user._id,
        text: texttrimmed,
        replyingTo: { tweetId: req.body.replyingTo, tweetExisted: true },
      });
    }
    res.status(200).send({ AddedTweetStatus: "Reply Stored" }).end();
  } catch (e) {
    res.status(400).send({ error: e.toString() }).end();
  }
});

router.delete("/tweet/:id", auth("any"), async (req, res) => {
  try {

    const targettweet = await Tweet.findById(req.params.id);
    if (!targettweet) {
      throw new Error("Not Found");
    }
    const B = targettweet.authorId.equals(req.user._id);
    if (req.admin || B) {
      if (targettweet.replyingTo.tweetId) {
        let replyedOnTweet = await Tweet.findById(
          targettweet.replyingTo.tweetId
        );
        if (replyedOnTweet) {
          replyedOnTweet.replyCount--;
          await replyedOnTweet.save();
        }
      }
      if (targettweet.retweetedTweet.tweetId) {
        let retweetedTweet = await Tweet.findById(
          targettweet.retweetedTweet.tweetId
        );
        if (retweetedTweet) {
          retweetedTweet.retweetCount--;
          await retweetedTweet.save();
        }
      }
      await Tweet.findByIdAndDelete(req.params.id);
      res.status(200).send({Status:"Success"});
    } else {
      throw new Error("Unauthorized");
    }
  } catch (e) {
    if (e == "Error: Not Found") {
      res.status(404);
    } else {
      res.status(400);
    }
    res.status(400).send({ error: e.toString() });
  }
});

router.put("/tweet/:id/like", auth("user"), async (req, res) => {
  try {
    await req.user.isBanned();
    //likes or unlikes a tweet
    let unliked = false;
    let unlikedIndex;
    //unliked determines if the put request is a like or an unlike(variable unliked)
    //variable unlikedIndex determines which element is the like pending to be removed
    const ReqTweet = await Tweet.findById(req.params.id);
    const user = await User.findById(ReqTweet.authorId);

    if (!ReqTweet) {
      //makes sure that tweet exists by making sure ReqTweet is not a null
      e = "Error : Not Found";
      throw e;
    }
    let likes = ReqTweet.likes;
    for (let i = 0; i < ReqTweet.likeCount; i++) {
      //searches if user liked this tweet before
      // if true toggle unliked and get index of like of current user and break the loop
      // if false continue loop and leave unliked as false and leave loop going till end of likes array
      if (likes[i].like.equals(req.user._id)) {
        unliked = true;
        unlikedIndex = i;
        break;
      }
    }
    if (unliked === true) {
      //if unliked is true there are 2 possiblities
      if (ReqTweet.likeCount > 1) {
        //if the like pending for removal is not the only one in the array
        //use splice and decrease count and update the tweet in the database
        ReqTweet.likes.splice(unlikedIndex, 1);
        ReqTweet.likeCount = ReqTweet.likeCount - 1;
        await ReqTweet.save();

        res.status(201);
        res.send({ ReqTweet, isliked: false });
      } else if (ReqTweet.likeCount == 1) {
        //if the like pending for removal is the only one in the array return the likes array as
        //an empty array "[]" and make the count equal to zero and update tweet in the database
        //? splice function doesn't work when it is required to remove the only element in an array
        //? should i return the empty array as [] or is there something else to do?
        ReqTweet.likes = [];
        ReqTweet.likeCount = 0;
        await ReqTweet.save();
        res.status(201);
        res.send({ ReqTweet, isliked: false });
      }
    } else if (unliked === false) {
      //if the unliked is false then add a like attribute with the id of the user that
      //liked the tweet into the likes array and update the tweet in the database
      ReqTweet.likes = ReqTweet.likes.concat({ like: req.user._id });
      ReqTweet.likeCount++;
      await ReqTweet.save();

      //* Notification part

      if (user.Notificationssetting.liketweet) {
        const text = req.user.tag+" liked your lar";
        const notifications = new Notification({ userId: req.user._id, text,notifiedUId:user._id });
        notifications.save();
        const tokens = await Token.find({ ownerId: user._id });
      
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
        }}
  //*end of Notification part


      res.status(201);
      res.send({ ReqTweet, isliked: true });
    
  }
} catch (e) {
    //catch and send back errors to the front end
    res.status(400);
    res.send({ error: e.toString() });
  }
});



/**Provide Viewer and Tweet==>Filters the tweet's replies*/
function replyFilterFunc(viewer,tweet){
  const viewerId=viewer._id;
  if(viewerId.equals(tweet.authorId._id)){return;}
  let followArr=viewer.following;
  followArr = followArr.map((follow) => {
    return follow.followingId.toString();
  });
  tweet.reply=tweet.reply.filter(function visCheck(reply){
    if(viewerId.equals(reply.authorId._id)){return true;}
    else if(followArr.includes(reply.authorId._id.toString())){return true;}
    else if(!reply.authorId.isPrivate){return true;}
    else{return false;}
  })
}
/**Provide Viewer and Tweet==>Returns an editted tweet if replyingTo tweet is Private else returns null*/
function reptoFilterFunc(viewer,tweet){
  if(!tweet.replyingTo.tweetId){return null;}
  const viewerId=viewer._id;
  console.log(viewerId.equals(tweet.replyingTo.tweetId.authorId._id));
  if(viewerId.equals(tweet.replyingTo.tweetId.authorId._id)){return null;}
  if(!tweet.replyingTo.tweetId.authorId.isPrivate){return null;}
  let followArr=viewer.following;
  followArr = followArr.map((follow) => {
    return follow.followingId.toString();
  });
  if(followArr.includes(tweet.replyingTo.tweetId.authorId._id.toString())){console.log(followArr);return null;}
  const temp={...tweet._doc};
  temp.replyingTo={
    tweetId: null,
    tweetExisted:true,
    isPrivate:true
  };
  return temp;
}
/**Provide Viewer and Tweets==>Filters Tweets*/
function tweetFilterFunc(viewer,tweets){
  const viewerId=viewer._id;
  let followArr=viewer.following;
  followArr = followArr.map((follow) => {
    return follow.followingId.toString();
  });
  tweets=tweets.filter(function visCheck(tweet){
    if(viewerId.equals(tweet.authorId._id)){return true;}
    else if(followArr.includes(tweet.authorId._id.toString())){return true;}
    else if(!tweet.authorId.isPrivate){return true;}
    else{return false;}
  })
  return tweets;
}
/**Provide Viewer and Target User ID==>Determines if the Viewer is allowed to view the Target*/
async function allowView(viewer,targetId){
  console.log("🚀 ~ file: tweetroute.js ~ line 1341 ~ allowView ~   viewer._id.toString()",   viewer._id.toString())
  if(viewer._id.toString()===targetId){return true;}
  let followArr=viewer.following;
  followArr = followArr.map((follow) => {
    return follow.followingId.toString();
  });
  if(followArr.includes(targetId)){return true;}
  const target=await User.findById(targetId);
  if(!target.isPrivate){return true;}
  return false;
}


module.exports = router;