const express = require("express");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../models/User");

const fs = require("fs");

const router = new express.Router();
//! remember to require and install badwords
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const filter = require("../ethics/bad_words");
const Tweet = require("../models/Tweet");

router.post("/tweet", auth("user"), upload.array("image"), async (req, res) => {
  //Creates a new tweet with the json data that the user sends
  // through req.body
  try {
    let text = req.body.text.trim();
    //text attribute of the post is trimmed (remove whitespaces from both sides of strong)
    //then put in a variable called text for ease of use
    if (text.length == 0) {
      //checks if user sent Text parameter empty
      //if true the post will be rejected and sends an error
      e = "Empty Post";
      throw e;
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
      //? I'm still using facebook's blacklist for bad words,
      //? should i rely on it and accept the performance issues that string list
      //? this big might cause or rely on bad words default smaller list?
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
    if (req.body.imageCheck === "true") {
      // const uploader = (path) => cloudinary.uploads(path, "Images");
      const urls = [];
      const files = req.files;
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
        gallery: urls,
      });
    } else {
      await Tweet.create({ ...req.body, authorId: req.user._id });
    }
    res.status(200).send({ AddedTweetStatus: "Tweet Stored" })
  } catch (e) {
    //here all exception caught sends their respective
    //error according to failed test

    res.status(400).send({ error: e.toString() });
  }
});

router.get("/tweet/:id", auth("any"), async (req, res) => {
  try {
    //gets tweet ID from route parameter /:id
    //and searches for respective tweet
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      e = "tweet not found";
      throw e;
    }

    if (tweet.text === "No-text") {
      //in case you get a tweet with this place holder in its text path
      //replace it with null
      //! you will only get no text in case of retweet
      tweet.text = null;
    }

    await tweet.populate({
      path: "authorId",
      select: "_id screenName tag followercount followingcount",
    });

    if (tweet.retweetedTweet) {
      await tweet.populate({
        //if it is a retweet view content of retweeted tweet
        path: "retweetedTweet",
        select:
          "_id replyingTo authorId text tags likeCount retweetCount gallery likes",
      });
    }

    res.send(tweet);
  } catch (e) {
    //here all caught errors are sent to the client

    //here for testing purposes if an unhandled error routerears
    res.status(400).send({ error: e.toString() });
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
      const temp = await Tweet.findByIdAndDelete(req.params.id);
      res.status(200).end("Success");
    } else {
      throw new Error("Unauthorized");
    }
  } catch (e) {
    if (e == "Error: Not Found") {
      res.status(404);
    } else {
      res.status(400);
    }
    res.send({ error: e.toString() });
  }
});

router.put("/tweet/:id/like", auth("user"), async (req, res) => {
  try {
    //likes or unlikes a tweet
    let unliked = false;
    let unlikedIndex;
    //unliked determines if the put request is a like or an unlike(variable unliked)
    //variable unlikedIndex determines which element is the like pending to be removed
    const ReqTweet = await Tweet.findById(req.params.id);
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
        console.log(ReqTweet.likes.toString());
        ReqTweet.likeCount = ReqTweet.likeCount - 1;
        await ReqTweet.save();
        res.status(201);
        res.send(ReqTweet.likes);
      } else if (ReqTweet.likeCount == 1) {
        //if the like pending for removal is the only one in the array return the likes array as
        //an empty array "[]" and make the count equal to zero and update tweet in the database
        //? splice function doesn't work when it is required to remove the only element in an array
        //? should i return the empty array as [] or is there something else to do?
        ReqTweet.likes = [];
        ReqTweet.likeCount = 0;
        await ReqTweet.save();
        res.status(201);
        res.send(ReqTweet.likes);
      }
    } else if (unliked === false) {
      //if the unliked is false then add a like attribute with the id of the user that
      //liked the tweet into the likes array and update the tweet in the database
      ReqTweet.likes = ReqTweet.likes.concat({ like: req.user._id });
      ReqTweet.likeCount++;
      await ReqTweet.save();
      res.status(201);
      res.send(ReqTweet.likes);
    }
  } catch (e) {
    //catch and send back errors to the front end
    if (e == "Error: Not Found") {
      res.status(404);
    } else {
      res.status(400);
    }
    res.send({ error: e.toString() });
  }
});

router.post("/retweet", auth("user"), async (req, res) => {
  try {
    //same as creating a new tweet but has an added retweet that
    //also increases the retweet count on the original tweet
    const Retweetedtweet = await Tweet.findById(req.body.retweetedTweet);
    if (!Retweetedtweet) {
      e = "Retweeted tweet does not exist";
      throw e;
    }
    Retweetedtweet.retweetCount++;
    let text = req.body.text.trim();
    //text attribute of the post is trimmed (remove whitespaces from both sides of strong)
    //then put in a variable called text for ease of use

    if (!text||text.length == 0) {
      //in case of retweet with no text replace here place holder to be
      //removed while getting

      text = "No-text";
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
    await Retweetedtweet.save();
    const tweet =await Tweet.create({ ...req.body, authorId: req.user._id, text: text });
    res.status(200).send({ AddedTweetStatus: "Retweet Stored" }).end();
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});




router.get("/tweet/user/:id", auth("any"), async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const user=await User.findOne({ _id:req.params.id})
     const tweets=await user.populate(
        {path: "Tweets",
        options:{
          limit: parseInt(limit), //to limit number of user 
          skip: parseInt(skip),   },
          populate:[{
            path: "authorId",
            strictPopulate: false,
            select: "_id screenName tag followercount followingcount profileAvater.url",
         },
           {
          //if it is a retweet view content of retweeted tweet
          path: "retweetedTweet",
          strictPopulate: false,
          select:
            "_id replyingTo authorId text tags likeCount retweetCount gallery likes",
            populate:{
              path: "authorId",
              strictPopulate: false,
              select: "_id screenName tag followercount followingcount profileAvater.url",
           },
        }]
    })
    if (tweets.length===0) {
      e = "tweet not found";
      throw e;
    }
    console.log(user.Tweets);
    res.send(user.Tweets);
  } catch (e) {
    //here all caught errors are sent to the client

    //here for testing purposes if an unhandled error routerears
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/timeline", auth("any"), async (req, res) => {
  try {
    
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

 
    const followingsId=req.user.following.map(
        user=>{return user.followingId}
        )
    const user=req.user
  
       const followerTweet=await Tweet.find({authorId:{$in:followingsId}}).limit(limit).skip(skip).populate(
        {
          path: "retweetedTweet",
          strictPopulate: false,
          select:
            "_id replyingTo authorId text tags likeCount retweetCount gallery likes",
            populate:{
              path: "authorId",
              strictPopulate: false,
              select: "_id screenName tag followercount followingcount profileAvater.url",
           },
        }
      ).populate(
        {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag followercount followingcount profileAvater.url",
        }
      )


    
    if (followerTweet.length===0) {
      e = "tweet not found";
      throw e;
    }
    res.send(followerTweet);
  } catch (e) {
    //here all caught errors are sent to the client

    //here for testing purposes if an unhandled error routerears
    res.status(400).send({ error: e.toString() });
  }
});

module.exports = router;