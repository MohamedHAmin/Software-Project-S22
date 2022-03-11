const express = require("express");
const tweet = require("../models/tweet");
const user = require("../models/users");
const auth = require("../midlware/auth");
const router = new express.Router();
const app=express()
app.use(express.json())
router.post("/tweet", async (req, res) => {
  try {
    console.log(req.body.userID)
    const newtweet=await tweet.create(req.body)
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
router.put("/tweet/:id", async (req, res) => {
  try {
    const newtweet=await tweet.findByIdAndUpdate(req.params.id,{Text:req.body.Text})
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
router.get("/tweet/:uid", async (req, res) => {
  try {
    const newtweet=await tweet.find({userID:req.params.uid})
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
////////////////
router.delete("/tweet/:id", async (req, res) => {
  try {
    const newtweet=await tweet.find({userID:req.params.uid})
    res.status(200).json({newtweet}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});
/////////////////////////////////////////////////////////////////
router.post("/user", async (req, res) => {
  try {
    const newuser=await user.create(req.body)
    res.status(200).json({newuser}).end()
  } catch (e) {
    res.status(400).send("error");
  }
});

module.exports = router;
