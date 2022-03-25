const express = require("express");
const Tweet = require("../models/tweet");
const User = require("../models/users");
const Report = require("../models/report");
const auth = require("../middleware/auth");
const adminauth = require("../middleware/adminauth");
const userauth = require("../middleware/userauth");
const { query } = require("express");
const router = new express.Router();



          //~~~~~~Create Tweet~~~~~~~~

router.post("/tweet", async (req, res) => {
  try {
    const tempuser=await User.findById(req.body.userId)
    const B=await tempuser.isBanned()
    if(B){
      res.status(200).send("User is Banned").end()
      return
    }
    const newtweet=await Tweet.create(req.body)
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
//~~~~~~Edit Tweet~~~~~~~~
router.put("/tweet/:id", async (req, res) => {
  try {
    const newtweet = await Tweet.findByIdAndUpdate(req.params.id, {
      Text: req.body.Text,
    });
    res.status(200).json({ newtweet }).end();
  } catch (e) {
    res.status(400).send("error");
  }
});
//~~~~~~Retrieve Tweets~~~~~~~~
router.get("/tweet/:uid", async (req, res) => {
  try {
    const temp = await User.findById(req.params.uid)
    let newtweet = await Tweet.find({userId:req.params.uid}).populate('retweet')
    if(temp.isPrivate==true){res.status(400).end("Private Account")}
    else{res.status(200).json({newtweet}).end()}
  } catch (e) {
    res.status(400).send("error");
  }
});
//~~~~~~Delete Tweet~~~~~~~~
router.delete("/tweet/:id",auth ,async (req, res) => {
  try {
    const targettweet=await Tweet.findById(req.params.id)
    if(!targettweet){throw new Error("Not Found")}
    const B=targettweet.userId.equals(req.user._id)
    if(req.admin||B)
    {
      const temp=await Tweet.findByIdAndDelete(req.params.id)
      res.status(200).end("Success");
    }
    else{
      throw new Error("Unauthorized")
    }
  }
  catch (e) {
    if(e=="Error: Not Found"){
      res.status(404)
    }
    else{res.status(400)}
    res.send(""+e)
  }
});
  /////////////~~~~~~~~~~~~~~~~create user~~~~~~~~~`////

  router.post("/User", async (req, res) => {
    const user = new User(req.body);
    
    try {
      await user.save();
      const token = await user.generateAuthToken();
  
      res.send({ user,token});
    } catch (e) {
      res.status(400).send("error"+e);
    }
  });
          //~~~~~~Report~~~~~~~~
router.post("/report", async (req, res) => {
  try {
    const newreport=await Report.create(req.body)
    res.status(200).json({newreport}).end()

  } catch (e) {
    console.log(e)
    res.status(400).send("error");
  }
});
//~~~~~~Search for user or tweet~~~~~~~~
//Search will take the text from the search bar in req.body and search for the keyword in all tweets
//and return all matching tweets and will also lookup users that has this keyword and return them
// if not found will return a 200 status but say it is not found if an error occured will return
// a 400 timeout or 500 server error
router.post("/search", async (req, res) => {
  try {
    console.log("Search function implementation");
  } catch (e) {
    console.log("faced an error");
  }
});
//~~~~~~Reply on a tweet~~~~~~~~
//Function gets id of tweet and req.body and use them to create a reply on the specified tweet
router.post("/tweet/:id/reply", async (req, res) => {
  try {
    console.log("Reply creation function");
  } catch (e) {
    console.log("faced an error");
  }
});

//~~~~~~delete a Reply on a tweet~~~~~~~~
//Function gets tweet id to locate reply in it using reply id when found deletes it
router.delete("/tweet/:id/reply/:replyid", async (req, res) => {
  try {
    console.log("Reply deletion function");
  } catch (e) {
    console.log("faced an error");
  }
});

//~~~~~~edit a Reply on a tweet~~~~~~~~
//Function gets tweet id and reply id to view tweet and the required reply with it
router.get("/tweet/:id/reply/:replyid", async (req, res) => {
  try {
    console.log("Reply read function");
  } catch (e) {
    console.log("faced an error");
  }
});

//~~~~~~get a Reply on a tweet~~~~~~~~
//Function gets tweet id to locate reply in it using reply id when found edits it
router.put("/tweet/:id/reply/:replyid", async (req, res) => {
  try {
    console.log("Reply edit function");
  } catch (e) {
    console.log("faced an error");
  }
});

//~~~~~~Retweet~~~~~~~~
//Function that gets tweet post the same tweet under the guise of retweet in another profile
router.post("/retweet", async (req, res) => {
  try {
    console.log("Retweet creation function");
  } catch (e) {
    console.log("faced an error");
  }
});

module.exports = router;

