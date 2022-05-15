const  User = require('../models/User')
const mongoose = require('mongoose')
require('env-cmd')
const GoogleStrategy = require('passport-google-oauth20').Strategy

module.exports = function (passport){
    passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/user/auth/google/callback',
}, async(accessToken, refreshToken , profile , done)=>{
    //console.log(refreshToken);
    const newUser = { 
        googleId : profile.id,
        screenName: profile.displayName,
        tag: profile.name.givenName,
        profileAvater: profile.photos[0].value,
        verified:true,
        email:profile.emails[0].value,
        password:"googledummy123"
    }
 try {
        let user = await User.findOne({ googleId: profile.id })
     if (user){
        done(null,user)
        }
     else{
         // creates a new user if not found 
        user = await User.create(newUser)
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