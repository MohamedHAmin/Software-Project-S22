const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
//! remember to require and install badwords

const filter = require("../ethics/bad_words");
const Tweet = require("../models/Tweet");

router.post("/tweet",auth('user'),async (req, res) => {
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
    //if text passed through all tests creates a new entry in the database
    //and sends an OK status message to the client
    await Tweet.create({...req.body,authorId:req.user._id});
    res.status(200).send({ AddedTweetStatus: "Tweet Stored" }).end();
  } catch (e) {
    //here all exception caught sends their respective
    //error according to failed test
 
      res.status(400).send({ error: e.toString() });
   
  }
});

router.get("/tweet/:id", auth('any') ,async (req, res) => {
  try {

    //gets tweet ID from route parameter /:id
    //and searches for respective tweet
    // TODO: add populate to tweet to send user ID and screenName to the tweet
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      e = "tweet not found";
      throw e;
    }
    await tweet.populate({
      path: "authorId",
      select: '_id screenName tag followercount followingcount'
    });
    res.send(tweet);
  } catch (e) {
    //here all caught errors are sent to the client
   
      //here for testing purposes if an unhandled error routerears
      res.status(400).send({ error: e.toString() });
    
  }
});

router.delete("/tweet/:id",auth("any"),async (req, res) => {
  try {

    const targettweet=await Tweet.findById(req.params.id)
    if(!targettweet){throw new Error("Not Found")}
    const B=targettweet.authorId.equals(req.user._id)
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
    res.send({error:e.toString()})
  }
});


module.exports=router;