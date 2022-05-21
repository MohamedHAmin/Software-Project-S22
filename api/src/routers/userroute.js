const express = require("express");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const Report = require("../models/Report");
const Admin = require("../models/Admin")
const auth = require("../middleware/auth");
const { query } = require("express");
const router = new express.Router();

            //~~~~~~Report~~~~~~~~
router.post("/report",auth("user"),async (req, res) => {
    try {
      if(req.user._id.equals(req.body.reportedId)){throw Error("Cannot Report Self")}
      const report=await Report.create({...req.body,reporterId:req.user._id});
      if(report.type==="Tweet")
      {
        await Report.populate(report,{
          path:"reportedId",
          select:"authorId",
          model:Tweet,
          populate:{
            path:"authorId",
            select:"_id screenName tag"
          }
        })
      }
      res.status(201).send({report}).end();
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
module.exports = router;
