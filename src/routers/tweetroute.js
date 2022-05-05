const express = require("express");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../models/User");
const mongoose = require("mongoose");
const fs = require("fs");

const router = new express.Router();
//! remember to require and install badwords
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const filter = require("../ethics/bad_words");
const Tweet = require("../models/Tweet");
const res = require("express/lib/response");

router.post("/tweet", auth("user"), upload.array("image"), async (req, res) => {
  //Creates a new tweet with the json data that the user sends
  // through req.body
  try {
    await req.user.isBanned();
    let text = req.body.text;
    let texttrimmed;
    //text attribute of the post is trimmed (remove whitespaces from both sides of strong)
    //then put in a variable called text for ease of use
    if (!text || texttrimmed.length < 1) {
      //checks if user sent Text parameter empty
      //if true the post will be rejected and sends an error
      e = "Empty Post";
      throw e;
    } else {
      texttrimmed = req.body.text.trim();
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
        }
      }
    }
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
        gallery: urls,
      });
    } else {
      await Tweet.create({ ...req.body, authorId: req.user._id });
    }
    res.status(200).send({ AddedTweetStatus: "Tweet Stored" });
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
    await req.user.isBanned();
    const tweet = await Tweet.findById(req.params.id);
    let sentTweet;
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
      select: "_id screenName tag profileAvater.url",
    });
    await tweet.populate({
      path: "retweetedTweet.tweetId",
      strictPopulate: false,
      select:
        "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount",
      populate: {
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag profileAvater.url",
      },
    });
    await tweet.populate({
      path: "reply",
      select:
        "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount",
      strictPopulate: false,
      populate: [
        {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
        {
          path: "reply",
          select: "_id replyingTo authorId text tags likeCount gallery",
          strictPopulate: false,
          populate: {
            path: "authorId",
            strictPopulate: false,
            select: "_id screenName tag profileAvater.url",
          },
        },
      ],
    });

    let Retweet = tweet.retweetedTweet;
    let modifiedRetweet = { tweetId: "", tweetExisted: "" };
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

    console.log(modifiedreplies);

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

router.delete("/tweet/:id", auth("any"), async (req, res) => {
  try {
    await req.user.isBanned();
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
      res.status(201);
      res.send({ ReqTweet, isliked: true });
    }
  } catch (e) {
    //catch and send back errors to the front end
    res.status(400);
    res.send({ error: e.toString() });
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

    if (
      (!text || texttrimmed.length < 1) &&
      (!req.body.imageCheck || req.body.imageCheck === "false")
    ) {
      //checks if user sent Text parameter empty
      //if true the post will be rejected and sends an error
      e = "Empty Post";
      throw e;
    } else if (
      (!text || texttrimmed.length < 1) &&
      req.body.imageCheck === "true"
    ) {
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

//tprofile tweets
router.get("/tweet/user/:id", auth("any"), async (req, res) => {
  try {
    await req.user.isBanned();
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0; //? it defoult get first tweet and not skip any

    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      e = "user doesn't exist";
      throw e;
    }
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
          strictPopulate: true,
          select:
            "_id replyingTo authorId text tags likeCount retweetCount gallery likes",
          populate: {
            path: "authorId",
            strictPopulate: false,
            select: "_id screenName tag profileAvater.url",
          },
        },
      ],

      options: { sort },
    });

    if (!user.Tweets.length < 1) {
      user.Tweets = user.Tweets.map(async (tweet) => {
        const isliked = tweet.likes.some(
          (like) => like.like.toString() == req.user._id.toString()
        );
        // if (tweet.replyingTo.tweetExisted) {
        //   let neededreply = await Tweet.findById(tweet.replyingTo.tweetId);
        //   if (!neededreply) {
        //     tweet.replyingTo.tweetId = null;
        //   }
        // }
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
    await req.user.isBanned();
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0; //? it defoult get first tweet and not skip any

    const followingsId = req.user.following.map((user) => {
      return user.followingId;
    });
    const user = req.user;
    //console.log('1')
    followingsId.push(req.user._id);
    //console.log(followingsId)
    let followerTweet = await Tweet.find({ authorId: { $in: followingsId } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "retweetedTweet.tweetId",
        strictPopulate: false,
        select:
          "_id replyingTo authorId text tags likeCount retweetCount replyCount gallery likes",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
      })
      .populate({
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag profileAvater.url",
      });
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
    //console.log('2')
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
    let searchedItem = req.params.searchedtext;
    let resultTweets = await Tweet.find({
      $text: { $search: searchedItem },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "retweetedTweet.tweetId",
        strictPopulate: false,
        select:
          "_id replyingTo authorId text tags likeCount retweetCount gallery likes",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
      })
      .populate({
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag profileAvater.url",
      });

    let resultUsers = await User.find({ $text: { $search: searchedItem } })
      .sort({ tag: 1 })
      .limit(limit)
      .skip(skip);

    if (resultUsers.length < 1 && resultTweets.length < 1) {
      e = "no users or tweets found";
      throw e;
    }
    let searchResults = { Tweets: resultTweets, Users: resultUsers };
    res.send(searchResults);
  } catch (e) {
    //here all caught errors are sent to the client
    res.status(400).send({ error: e.toString() });
  }
});

router.get("/profile/likedtweets", auth("user"), async (req, res) => {
  try {
    await req.user.isBanned();
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let likedtweets = await Tweet.aggregate([
      { $match: { "likes.like": req.user._id } },
      { $project: { likes: 0 } },
      {
        $lookup: {
          from: User.collection.name,
          localField: "authorId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                screenName: 1,
                tag: 1,
                "profileAvater.url": 1,
              },
            },
          ],
          as: "authorId",
        },
      },
      {
        $lookup: {
          from: Tweet.collection.name,
          localField: "retweetedTweet.tweetId",
          pipeline: [
            {
              $project: {
                _id: 1,
                replyingTo: 1,
                authorId: 1,
                text: 1,
                tags: 1,
                likeCount: 1,
                retweetCount: 1,
                gallery: 1,
                replyCount: 1,
              },
            },
            {
              $lookup: {
                from: User.collection.name,
                localField: "authorId",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      screenName: 1,
                      tag: 1,
                      "profileAvater.url": 1,
                    },
                  },
                ],
                as: "authorId",
              },
            },
          ],
          foreignField: "_id",
          as: "retweetedTweet.tweetId",
        },
      },
    ])
      .limit(limit)
      .skip(skip);
    if (likedtweets.length < 1) {
      e = "no liked tweets found";
      throw e;
    }
    for (let i = 0; i < likedtweets.length; i++) {
      if (
        !Array.isArray(likedtweets[i].retweetedTweet.tweetId) ||
        !likedtweets[i].retweetedTweet.tweetId.length
      ) {
        likedtweets[i].retweetedTweet.tweetId = null;
      }
    }

    res.send(likedtweets);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/profile/replies", auth("user"), async (req, res) => {
  try {
    await req.user.isBanned();
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let userReplies = await Tweet.find({
      authorId: req.user._id,
      "replyingTo.tweetExisted": true,
    })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag profileAvater.url",
      });
    for (userReply of userReplies) {
      let temp = await Tweet.findById(userReply.replyingTo.tweetId);
      if (!temp) {
        userReply.replyingTo.tweetId = null;
      }
    }
    if (userReplies.length < 1 || !userReplies) {
      e = "no replies found";
      throw e;
    }
    res.send(userReplies);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});

router.get("/explore", auth("any"), async (req, res) => {
  try {
    await req.user.isBanned();
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0; //? it defoult get first tweet and not skip any

    const followingsId = req.user.following.map((user) => {
      return user.followingId;
    });
    // const user = req.user;

    followingsId.push(req.user._id);

    let exploredTweet = await Tweet.find(
      { authorId: { $nin: followingsId , $ne: req.user._id } }
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "retweetedTweet.tweetId",
        strictPopulate: false,
        select:
          "_id replyingTo authorId text tags likeCount retweetCount replyCount gallery likes",
        populate: {
          path: "authorId",
          strictPopulate: false,
          select: "_id screenName tag profileAvater.url",
        },
      })
      .populate({
        path: "authorId",
        strictPopulate: false,
        select: "_id screenName tag profileAvater.url",
      });
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
    res.send(exploredTweet);
  } catch (e) {
    //here all caught errors are sent to the client

    //here for testing purposes if an unhandled error routerears
    res.status(400).send({ error: e.toString() });
  }
});

module.exports = router;
