const express = require("express");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const Report = require("../models/Report");
const Admin = require("../models/Admin")
const auth = require("../middleware/auth");
const { query } = require("express");
const router = new express.Router();

router.post("/create",auth("admin"),async (req, res) => {
   
    try {
      const deletedUser =await User.deleteOne({$and:[{email:req.body.email},{verified:false}]})
      const user = new User({...req.body,verified:false});
      const result = await user.save()
      const admin = new Admin({adminName:req.body.screenName,
      email:req.body.email
    });
      await admin.save();
      await User.updateOne({_id:user._id},{verified:true})
      const token = await admin.generateAuthToken();
      res.status(201).send({ status:"success"}).end();
    } catch (e) {

      if(e.code){
        return res.status(400).send({ error:e });
       }
      res.status(400).send({error:e.toString()});
    }
  });
          //~~~~~~Report~~~~~~~~

// TODO: IN NEXT PHASES
router.delete("/report/:id",auth("admin"),async (req, res) => {
  try {
    let deletedreports;
    const idType=req.query.IDType?req.query.IDType:null;
    if(idType==='Report')
    {
      deletedreports=await Report.findByIdAndDelete(req.params.id)
      if(!deletedreports){throw Error("Not Found")}
      res.status(200).json({deletedreports}).end()
    }
    else if(idType==='Reported')
    {
      deletedreports=await Report.deleteMany({reportedId:req.params.id});
      if(!deletedreports.deletedCount){throw Error("Not Found")}
      res.status(200).json({deletedreports}).end()
    }
    else
    {
      throw Error('Wrong Query Parameter')
    }
  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});
router.get("/report/:pageNum",auth("admin"),async (req, res) => {
  try {
    const filter = req.query.filter ? {type:req.query.filter} : {};
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const skip=(parseInt(req.params.pageNum)-1)*perPage;
    let reports=await Report.find(filter).populate({path:'reporterId',select:'tag'})
    .skip(skip).limit(perPage)
    .sort({createdAt:-1});
    reports= await Promise.all(reports.map(async(report)=>{
      if(report.type==="User")
      {
        return await Report.populate(report,{path:'reportedId',select:'screenName tag profileAvater',model:User})
      }
      else if(report.type==="Tweet")
      {
        return await Report.populate(report,{path:'reportedId',populate:{path:'authorId',select:'screenName tag profileAvater'},select:'text authorId likeCount replyCount retweetCount gallery',model:Tweet})
      }
    }))
    if(reports.length===0){throw Error("No Reports Found")}
    res.status(200).json({reports}).end()

  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});
router.get("/profile/:id",auth("admin"),async (req, res) => {
  try {
    const admin=await Admin.findById(req.params.id)
    if(!admin){throw Error("Not Found")}
    res.status(200).json({admin}).end()

  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});
router.post("/ban/:id",auth("admin"),async (req, res) => {
  try {
    const banDate=new Date();
    const duration=Number(req.body.duration);
    banDate.setDate(banDate.getDate()+duration);
    const bannedUser=await User.findByIdAndUpdate(req.params.id,{ban:banDate},{new:true}).select({screenName:1,ban:1})
    res.status(200).send({bannedUser})
  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});

router.get("/users/:pageNum",auth("admin"),async (req, res) => {
  try {
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const skip=(parseInt(req.params.pageNum)-1)*perPage;
    const users=await User.aggregate()
    .lookup({
      from:'reports',
      localField:'_id',
      foreignField:'reportedId',
      as:'Reported'
    })
    .addFields({
    'Reports':{$size:'$Reported'}
    })
    .project({
      _id:1,
      screenName:1,
      tag:1,
      Reports:1
    })
    .sort({Reports:-1})
    .skip(skip).limit(perPage);
    if(!users.length){throw Error("Not Found")}
    res.status(200).json({users}).end();

  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});
router.get("/tweets/:pageNum",auth("admin"),async (req, res) => {
  try {
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const skip=(parseInt(req.params.pageNum)-1)*perPage;
    let tweets=await Tweet.aggregate()
    .lookup({
      from:'reports',
      localField:'_id',
      foreignField:'reportedId',
      as:'Reported'
    })
    .addFields({
    'Reports':{$size:'$Reported'}
    })
    .project({
      Reports:1,
      text:1,
      authorId:1,
      likeCount:1,
      replyCount:1,
      retweetCount:1,
      gallery:1
    })
    .sort({Reports:-1})
    .skip(skip).limit(perPage);
    await Tweet.populate(tweets,{path:"authorId",select:"screenName tag profileAvater"});
    if(!tweets.length){throw Error("Not Found")}
    res.status(200).json({tweets}).end();

  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});
// router.get("/dashboard",auth("admin"),async (req, res) => {
//   try {
//     res.status(200).end("<h1>Placeholder<h1>")

//   } catch (e) {
//     console.log(e)
//     res.status(400).send({error:e.toString()});
//   }
// });

//~~~~~~Search for user or tweet~~~~~~~~
//Search will take the text from the search bar in req.body and search for the keyword in all tweets
//and return all matching tweets and will also lookup users that has this keyword and return them
// if not found will return a 200 status but say it is not found if an error occured will return
// a 400 timeout or 500 server error
// router.post("/search", async (req, res) => {
//   try {
//     console.log("Search function implementation");
//   } catch (e) {
//     console.log({error:e.toString()});
//   }
// });

module.exports = router;

