const express = require("express");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const Report = require("../models/Report");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");
const { query } = require("express");
const Notification = require("../models/Notification");
const notifiy = require("../utils/firbase");
const Token = require("../models/Token.js");
const router = new express.Router();

router.post("/create",auth("admin") ,async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({
      $and: [{ email: req.body.email }, { verified: false }],
    });
    const user = new User({ ...req.body, verified: false });
    const result = await user.save();
    const admin = new Admin({
      adminName: req.body.screenName,
      email: req.body.email,
    });
    await admin.save();
    await User.updateOne({ _id: user._id }, { verified: true });
    const token = await admin.generateAuthToken();
    res.status(201).send({ status: "success" }).end();
  } catch (e) {
    if (e.code) {
      return res.status(400).send({ error: e });
    }
    res.status(400).send({ error: e.toString() });
  }
});
//~~~~~~Report~~~~~~~~

router.delete("/report/:id", auth("admin"), async (req, res) => {
  try {
    let deletedreports;
    const idType = req.query.IDType ? req.query.IDType : null;
    if (idType === "Report") {
      deletedreports = await Report.findByIdAndDelete(req.params.id);
      if (!deletedreports) {
        throw Error("Not Found");
      }
      res.status(200).json({ deletedreports }).end();
    } else if (idType === "Reported") {
      deletedreports = await Report.deleteMany({ reportedId: req.params.id });
      if (!deletedreports.deletedCount) {
        throw Error("Not Found");
      }
      res.status(200).json({ deletedreports }).end();
    } else {
      throw Error("Wrong Query Parameter");
    }
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/report/:pageNum", auth("admin"), async (req, res) => {
  try {
    const filter = req.query.filter ? { type: req.query.filter } : {};
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const skip = (parseInt(req.params.pageNum) - 1) * perPage;
    let reports = await Report.find(filter)
      .populate({ path: "reporterId", select: "screenName tag profileAvater" })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });
    reports = await Promise.all(
      reports.map(async (report) => {
        if (report.type === "User") {
          return await Report.populate(report, {
            path: "reportedId",
            select: "screenName tag profileAvater",
            model: User,
          });
        } else if (report.type === "Tweet") {
          return await Report.populate(report, {
            path: "reportedId",
            populate: {
              path: "authorId",
              select: "screenName tag profileAvater",
            },
            populate: {
              path: "retweetedTweet.tweetId",
              select:
                "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
              populate: {
                path: "authorId",
                select: "_id screenName tag profileAvater.url",
              },
            },
            select: "text authorId retweetedTweet likeCount replyCount retweetCount gallery",
            model: Tweet,
          });
        }
      })
    );
    if (reports.length === 0) {
      throw Error("No Reports Found");
    }
    res.status(200).json({ reports }).end();
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/profile/:id", auth("admin"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      throw Error("Not Found");
    }
    res.status(200).json({ admin }).end();
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.post("/ban/:id", auth("admin"), async (req, res) => {
  try {
    const banDate = new Date();
    const duration = Number(req.body.duration);
    banDate.setDate(banDate.getDate() + duration);
    const bannedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ban: banDate },
      { new: true }
    ).select({ screenName: 1, ban: 1 });

    //*notification part
    const text = "You got banned for " + req.body.duration + " day(s)";
    const notifications = new Notification({ notifiedUId: bannedUser._id, text });
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

    //* end of notification part
    res.status(200).send({ bannedUser });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});

router.get("/users/:pageNum", auth("admin"), async (req, res) => {
  try {
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const skip = (parseInt(req.params.pageNum) - 1) * perPage;
    const users = await User.aggregate()
      .lookup({
        from: "reports",
        localField: "_id",
        foreignField: "reportedId",
        as: "Reported",
      })
      .addFields({
        Reports: { $size: "$Reported" },
      })
      .project({
        _id: 1,
        screenName: 1,
        profileAvater:1,
        tag: 1,
        Reports: 1,
      })
      .sort({ Reports: -1 })
      .skip(skip)
      .limit(perPage);
    if (!users.length) {
      throw Error("Not Found");
    }
    res.status(200).json({ users }).end();
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/tweets/:pageNum", auth("admin"), async (req, res) => {
  try {
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const skip = (parseInt(req.params.pageNum) - 1) * perPage;
    let tweets = await Tweet.aggregate()
      .lookup({
        from: "reports",
        localField: "_id",
        foreignField: "reportedId",
        as: "Reported",
      })
      .addFields({
        Reports: { $size: "$Reported" },
      })
      .project({
        Reports: 1,
        text: 1,
        retweetedTweet: 1,
        authorId: 1,
        likeCount: 1,
        replyCount: 1,
        retweetCount: 1,
        gallery: 1,
      })
      .sort({ Reports: -1 })
      .skip(skip)
      .limit(perPage);
    await Tweet.populate(tweets, {
      path: "authorId",
      select: "screenName tag profileAvater",
    });
    await Tweet.populate(tweets, {
      path: "retweetedTweet.tweetId",
      select:
        "_id replyingTo authorId text tags likeCount retweetCount gallery likes replyCount createdAt",
      populate: {
        path: "authorId",
        select: "_id screenName tag profileAvater.url",
      }
    });
    if (!tweets.length) {
      throw Error("Not Found");
    }
    res.status(200).json({ tweets }).end();
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/dashboard",auth("admin"),async (req, res) => {
  try {
    let stats={
      Current:{},
      Past:{},
      TopTweet:{}
    };
    const duration=(req.query.duration==="Week")?7:((req.query.duration==="Month")?30:7);
    const thisDur = new Date();
    const pastDur = new Date();
    thisDur.setDate(thisDur.getDate() - duration);
    pastDur.setDate(pastDur.getDate() - duration*2);
    const tweetsCurrent=await Tweet.countDocuments({
      createdAt:{$gte:thisDur},
      replyingTo:{tweetId:null,tweetExisted:false}
    });
    const tweetsPast=await Tweet.countDocuments({
        createdAt:{$gte:pastDur},
        createdAt:{$lt:thisDur},
        replyingTo:{tweetId:null,tweetExisted:false}
    });
    stats.Current.tweetCount=tweetsCurrent;
    stats.Past.tweetCount=tweetsPast;
    const repliesCurrent=await Tweet.countDocuments({
      createdAt:{$gte:thisDur},
      "replyingTo.tweetExisted":true
    });
    const repliesPast=await Tweet.countDocuments({
        createdAt:{$gte:pastDur},
        createdAt:{$lt:thisDur},
        "replyingTo.tweetExisted":true
    });
    stats.Current.replyCount=repliesCurrent;
    stats.Past.replyCount=repliesPast;
    const retweetsCurrent=await Tweet.countDocuments({
      createdAt:{$gte:thisDur},
      "retweetedTweet.tweetExisted":true
    });
    const retweetsPast=await Tweet.countDocuments({
        createdAt:{$gte:pastDur},
        createdAt:{$lt:thisDur},
        "retweetedTweet.tweetExisted":true
    });
    stats.Current.retweetCount=retweetsCurrent;
    stats.Past.retweetCount=retweetsPast;
    const reportsCurrent=await Report.countDocuments({
      createdAt:{$gte:thisDur},
    });
    const reportsPast=await Report.countDocuments({
        createdAt:{$gte:pastDur},
        createdAt:{$lt:thisDur},
    });
    stats.Current.reportsCount=reportsCurrent;
    stats.Past.reportsCount=reportsPast;
    const usersCurrent=await User.countDocuments({
      createdAt:{$gte:thisDur},
    });
    const usersPast=await User.countDocuments({
        createdAt:{$gte:pastDur},
        createdAt:{$lt:thisDur},
    });
    const adminsCurrent=await Admin.countDocuments({
      createdAt:{$gte:thisDur},
    });
    const adminsPast=await Admin.countDocuments({
        createdAt:{$gte:pastDur},
        createdAt:{$lt:thisDur},
    });
    stats.Current.usersCount=usersCurrent-adminsCurrent;
    stats.Past.usersCount=usersPast-adminsPast;
    const topTweet=await Tweet.find({
      createdAt:{$gte:thisDur},
      replyingTo:{tweetId:null,tweetExisted:false},
      "retweetedTweet.tweetExisted":false
    })
    .populate({
      path:"authorId",
      select:"screenName tag followercount followingcount profileAvater"
    })
    .sort({likeCount:-1})
    .limit(1);
    if(topTweet.length)
    {
      stats.TopTweet={
        ...topTweet[0]._doc,
        reply:[],
        isliked:false
      }
    }
    res.status(200).json(stats).end();
  } catch (e) {
    console.log(e)
    res.status(400).send({error:e.toString()});
  }
});

//~~~~~~Search for user or tweet~~~~~~~~
//Search will take the text from the search bar in req.body and search for the keyword in all tweets
//and return all matching tweets and will also lookup users that has this keyword and return them
// if not found will return a 200 status but say it is not found if an error occured will return
// a 400 timeout or 500 server error
// router.post("/search", async (req, res) => {
//   try {
//     console.log("Search function implementation");
//   } catch (e) {
//     console.log({error:e.toString()});
//   }
// });

module.exports = router;