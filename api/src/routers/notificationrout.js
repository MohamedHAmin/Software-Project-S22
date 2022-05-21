const express = require("express");
const Notification = require("../models/Notification");

const auth = require("../middleware/auth");
const notifiy = require("../utils/firbase");
const { query } = require("express");
const router = new express.Router();


router.get("/notification", auth("any"),async (req, res) => {
  try { 
    const sort = { createdAt: -1 };
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let notifications=await Notification.find({notifiedUId:req.user._id}).sort(sort).limit(limit).skip(skip).populate({ path: "userId",
    select:
      "_id screenName tag profileAvater.url ",
})
     //notifications=notifications.reverse()


  
    let notifications2=await Notification.updateMany({notifiedUId:req.user._id},{seen:true})
    console.log("🚀 ~ file: notificationrout.js ~ line 26 ~ router.get ~ notifications2", notifications2)
    
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
      console.log("🚀 ~ file: notificationrout.js ~ line 46 ~ router.get ~ fcmToken", fcmToken)

      req.token.fcmToken= fcmToken
      await  req.token.save()
        
     // not();
      res.send(req.token);
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  });



module.exports = router;
