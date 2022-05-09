const express = require("express");

const Notification = require("../models/Notification");
const auth = require("../middleware/auth");
const notifiy = require("../utils/firbase");
const { query } = require("express");
const router = new express.Router();




router.get("/notification", auth("any"),async (req, res) => {
  try { 
    const notifications=await Notification.find({notifiedUId:req.user._id}).populate({ path: "userId",
    select:
      "_id screenName tag profileAvater.url",})
    
    res.send({notifications});
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.delete("/notification/:id", auth("any"),async (req, res) => {
  try { 
    const notifications=await Notification.deleteOne({_id:req.params.id})
    
    res.send({notifications});
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/sendspecific",async (req, res) => {
    try { 
        let fcmToken = req.query.token;
      
        notifiy(fcmToken,"test");
      res.send("done");
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  });
router.get("/sendfcm", auth("any"),async (req, res) => {
    try {
      
      let fcmToken = req.query.token;

      req.token.fcmToken= fcmToken
      await  req.token.save()
        
     // not();
      res.send(req.token);
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  });



module.exports = router;
