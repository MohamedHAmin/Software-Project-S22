const express = require("express")
const auth = require("../midlware/auth")
const User = require("../models/users")
const Token = require("../models/token")
const router = new express.Router()
/////////////////~~~~~~~~~~~~Signup~~~~~~~~~~~////////////////
router.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.send({ user,token});
    } catch (e) {
      res.status(400).send("error"+e);
    }
  });
 /////////////////~~~~~~~~~~~~Login~~~~~~~~~~~////////////////
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findbycradenials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send("error");
    }
  });
 /////////////////~~~~~~~~~~~~Logout~~~~~~~~~~~////////////////
//   router.post("/logout", auth, async (req, res) => {
//     try {
//       req.user.tokens = req.user.tokens.filter((token) => {
//         return token.token != req.token;
//       });
//       await req.user.save();
//       res.send("user");
//     } catch (e) {
//       res.status(400).send("error");
//     }
//   });
  router.delete("/logout" ,auth,  async (req, res) => {
      try{
      const deltoken = await Token.deleteMany({ token: req.body.token })
        //console.log(deltoken.deletedCount);
        //console.log(req.body);
      res.status(200).end("Success")
      
      }
      catch (err) {
      res.status(400).send("error");
    }
  })
  /////////////////~~~~~~~~~~~~Forgot Password ~~~~~~~~~~~////////////////
  /////////////////~~~~~~~~~~~~Email Verification~~~~~~~~~~~////////////////
  /////////////////~~~~~~~~~~~~Sign in with Google ~~~~~~~~~~~////////////////



  module.exports = router 