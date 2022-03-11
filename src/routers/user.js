const express = require("express");
const Users = require("../models/users");
const auth = require("../midlware/auth");
const router = new express.Router();

router.post("/follow", async (req, res) => {
  try {
    
  } catch (e) {
    res.status(400).send("error");
  }
});
router.get("/followers", async (req, res) => {
  try {
    res.write("<h1>OK</h1>")
    res.status(200).end()
  } catch (e) {
    res.status(400).send("error");
  }
});

module.exports = router;
