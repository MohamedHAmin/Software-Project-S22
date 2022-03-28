const express = require("express");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const Report = require("../models/Report");
const Admin = require("../models/Admin")
const auth = require("../middleware/auth");
const { query } = require("express");
const router = new express.Router();

router.post("/create", async (req, res) => {
    const admin = new Admin(req.body);
    try {
      await admin.save();
      const token = await admin.generateAdminToken();
  
      res.send({ admin,token}).end();
    } catch (e) {
      res.status(400).send("error"+e);
    }
  });
          //~~~~~~Report~~~~~~~~
router.delete("/report/:id", async (req, res) => {
  try {
    const newreport=await Report.findByIdAndDelete(req.params.id)
    res.status(200).json({newreport}).end()

  } catch (e) {
    console.log(e)
    res.status(400).send("error");
  }
});
router.post("/ban/:id", async (req, res) => {
  try {
    const tempUser=await User.findByIdAndUpdate(req.params.id,{ban:req.body.banUntil})
    res.status(200).send({tempUser})
  } catch (e) {
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

module.exports = router;

