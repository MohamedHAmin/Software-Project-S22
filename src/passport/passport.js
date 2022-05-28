const  User = require('../models/User')
const  Token = require('../models/Token')
const mongoose = require('mongoose')
require('env-cmd')
const generator = require('generate-password')
const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    }
  })
const jwt=require('jsonwebtoken');
const {v4: uuidv4 } = require("uuid")
const GoogleStrategy = require('passport-google-oauth20').Strategy
//Please be noted that no duplicate emails are allowed 


module.exports = function (passport){
  
    var newPassword = generator.generate({
        length: 10,
        numbers: true
    });
    passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : 'http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/auth/google/callback',
}, async(accessToken, refreshToken , profile , done)=>{

    const newUser = { 
        googleId : profile.id,
        screenName: profile.displayName,
        tag: profile.name.givenName + Math.floor(Math.random() *10000),
        "profileAvater.url": profile.photos[0].value,
       
        verified:true,
        email:profile.emails[0].value,
        password:newPassword
    }

 try {
        let user = await User.findOne({ googleId: profile.id })
     if (user){
        const token=jwt.sign({_id:user._id.toString()},process.env.SECRET,{

            expiresIn: '24h' // expires in 365 days
      
       })
         let newtoken = {
             token : token,
             ownerId: user._id,
             expiredAt: Date.now() + 86400000
         }
         newtoken = await Token.create(newtoken)

        done(null,user)
        }
     else{
        user = await User.create(newUser)
        SetPassword(user.email,newPassword)
        const token=jwt.sign({_id:user._id.toString()},process.env.SECRET,{

            expiresIn: '24h' // expires in 365 days
      
       })
         // creates a new user if not found and gives him a unique password
        let newtoken = {
            token : token,
            ownerId: user._id,
            expiredAt: Date.now() + 86400000
        }
        newtoken = await Token.create(newtoken)
        
        //user.generateAuthToken();
        done(null,user)
        }
} catch (err) {
        console.error(err)
}
}
)
)

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=> done(err,user))
})

}

const SetPassword = async (email,newPassword)=>{
   
    //delete any existing forgot password requests by the user 
    try{

  

  const mailOptions = {
    from : process.env.AUTH_EMAIL,
    to: email,
    subject : "Arriving from Google ? ",
    text: `Your generarted password is : ${newPassword}`
  }
  
      await transporter.sendMail(mailOptions)
    }
     catch(e)
    {
      console.log(e);
    }
  }
