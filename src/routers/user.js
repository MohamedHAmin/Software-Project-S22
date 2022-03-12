const express = require("express");
const tweet = require("../models/tweet");
const user = require("../models/users");
const auth = require("../midlware/auth");
const router = new express.Router();
const app=express()
app.use(express.json())
          //~~~~~~Create Tweet~~~~~~~~
router.post("/tweet", async (req, res) => {
  try {
    console.log(req.body.userID)
    const newtweet=await tweet.create(req.body)
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
          //~~~~~~Edit Tweet~~~~~~~~
router.put("/tweet/:id", async (req, res) => {
  try {
    const newtweet=await tweet.findByIdAndUpdate(req.params.id,{Text:req.body.Text})
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
          //~~~~~~Retrieve Tweets~~~~~~~~
router.get("/tweet/:uid", async (req, res) => {
  try {
    const newtweet=await tweet.find({userId:req.params.uid})
    res.status(200).json({newtweet}).end()
  } catch (e) {
    console.log(e)
    res.status(400).send("error");
  }
});
          //~~~~~~Delete Tweet~~~~~~~~
router.delete("/tweet/:id", async (req, res) => {
  try {
    const newtweet=await tweet.findByIdAndDelete(req.params.id)
    res.status(200).end('Success')
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

module.exports = router;
