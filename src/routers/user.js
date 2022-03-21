const express = require("express");
const tweet = require("../models/tweet");
const user = require("../models/users");
const Report = require("../models/report");
const auth = require("../midlware/auth");
const { query } = require("express");
const router = new express.Router();

router.post("/follow",auth,async (req, res) => {
  try {
    
    res.send()}
    catch (e) {
      res.status(400).send("error");
  }})


          //~~~~~~Create Tweet~~~~~~~~

router.post("/tweet", async (req, res) => {
  try {
    const newtweet=await tweet.create(req.body)
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
//~~~~~~Edit Tweet~~~~~~~~
router.put("/tweet/:id", async (req, res) => {
  try {
    const newtweet = await tweet.findByIdAndUpdate(req.params.id, {
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
    const temp = await user.findById(req.params.uid)
    let newtweet = await tweet.find({userId:req.params.uid}).populate('sharedtweet')
    //newtweet.forEach(async (value,index,array)=>await array[index]=value.populate('sharedtweet'))
    //if(newtweet.forEach()){await newtweet.populate('sharedtweet')}
    if(temp.isPrivate==true){res.status(400).end("Private Account")}
    else{res.status(200).json({newtweet}).end()}
  } catch (e) {
    res.status(400).send("error");
  }
});
//~~~~~~Delete Tweet~~~~~~~~
router.delete("/tweet/:id", async (req, res) => {
  try {
    const newtweet = await tweet.findByIdAndDelete(req.params.id);
    res.status(200).end("Success");
  } catch (e) {
    res.status(400).send("error");
  }
});
//~~~~~~Create User~~~~~~~~
router.post("/user", async (req, res) => {
  try {

    const newuser=await user.create(req.body)
    res.status(200).json({newuser}).end()
  } catch (e) {
    res.status(400).send("error");
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
router.post("/ban", async (req, res) => {
  try {
    res.status(200).end("<h1>Placeholder<h1>")

  } catch (e) {
    console.log(e)
    res.status(400).send("error");
  }
});
router.get("/report", async (req, res) => {
  try {
    const newreport=await Report.find().limit(req.query.perPage)
    res.status(200).json({newreport}).end()

  } catch (e) {
    console.log(e)
    res.status(400).send("error");
  }
});
router.get("/dashboard", async (req, res) => {
  try {
    res.status(200).end("<h1>Placeholder<h1>")

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

