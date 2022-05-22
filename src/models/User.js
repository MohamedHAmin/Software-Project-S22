const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Token = require("./Token");
const Admin = require("./Admin");
const { now, cloneWith } = require("lodash");

const userSchema = new mongoose.Schema({
  screenName: {
    type: String,
    required: true,
    trim: true
  },
  tag:{
     type:String,
     required:true,
     unique:true
  },
  Biography:{
    type:String,
    maxlength:280,
    default:""
  },
  website:{
    type:String,
    default:""
  },
  phoneNumber:{
    type:String,
    default:0
  },
  darkMode:{
       type:Boolean,
       default:false
  },

  location:{
    place:{
      type:String,
      default:null
    },
    visability:{
      type:Boolean,
      default:true
     }
  },
  birth:{
    date:{
      type:Date,
    default:"2001-04-24T13:35:32.392Z"
    },
    visability:{
      type:Boolean,
      default:true
     }
  },
  isPrivate:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
  ban:{
    type:Date,
    default:Date.now()
  },
  verified:{
    type: Boolean,
    default:false
  },
  email: {
    type: String,
    trim: true,
    unique:true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  profileAvater: {
    url:{ type: String,
    trim: true,
    default:null},
    cloudnaryId:{
      type: String,
    trim: true,
    default:null
    }
   
  },
  banner:{
    url:{ type: String,
      trim: true,
      default:null},
      cloudnaryId:{
        type: String,
      trim: true,
      default:null
      }
  },
  following:[{       ////who i follow //???
    followingId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
   },  
   {timestamps:true,
   toJSON: {virtuals: true},
   toObject: { virtuals: true }}],
  followercount:{        /////who follow me
    type:Number,
    default:0

  },
  followingcount:{        ////who i follow
    type:Number,
    default:0
  },
  googleId:{
    type: String,
    trim: true,
  },
  facebookId:{
    type: String,
    trim: true,
  },
  Notificationssetting:{
    newfollow:{
      type:Boolean,
      default:true
    },
    newtweet:{
      type:Boolean,
      default:true
    },
    liketweet:{
      type:Boolean,
      default:true
    }
  }
},
{
  timestamps:true,
  toJSON: {virtuals: true},
  toObject: { virtuals: true },
  strictPopulate:false
  
});
 //to connect with tweet he tweet
userSchema.virtual('Tweets',{
  ref:'Tweet',
  localField:'_id',
  foreignField:'authorId'
})
// userSchema.virtual('Tweets-timeline',{
//   ref:'Tweet',
//   localField:'following.followingId',
//   foreignField:'authorId'
// })
userSchema.virtual('follower',{
  ref:'User',
  localField:'_id',
  foreignField:'following.followingId'
})

userSchema.statics.findByCredentials=async(emailorUsername,password)=>{
  
  let user=await User.findOne({ $or: [ {email: emailorUsername}, {tag: emailorUsername} ] })
  // LET USER=AWAIT USER.FINDONE({EMAIL: EMAILORUSERNAME}) 
  if(!user){
    // user=await User.findOne({tag: emailorUsername})
      throw new Error('unable to login as user is not found')
  }
  if( !user.verified){
    throw new Error('unable to login as user is not verified')
  }
  const ismatch=await bcrypt.compare(password,user.password)
  if(!ismatch){
      throw new Error("unable to login")
  }
  let admin=await Admin.findOne({ email: user.email })
  let adminToken
  if(admin){
    adminToken = await admin.generateAuthToken();
  }
  return {user,adminToken}}


///delete data before send to client
userSchema.methods.toJSON=function(){
  const user = this
  const userobject=user.toObject()
  delete userobject.password
  delete userobject.tokens
  delete userobject.googleId
  delete userobject.following
  delete userobject.facebookId
  return userobject
}
// TODO
// userSchema.methods.isBanned=async function(){
//   const user = this
//   let now=new Date()
//   if(user.ban>now){
//     return true
//   }
//   else{
//     user.ban=null
//     await user.save()
//     return false
//   }
// }
userSchema.methods.isBanned=async function(){
  const user = this;
  if(!user.ban){return;} //if not ban return and move on normally
  let banDays=new Date();
  banDays=(user.ban-banDays)/(1000*60*60*24);
  if(banDays>0){
      throw new Error('User Banned for '+Math.floor(banDays)+' Days'); //if banned throw error with number of ban days
    }
    else{
      user.ban=null;
      await user.save();   
      return;  //if banned but ban duration over nullify ban then move on normally
    }
}

userSchema.methods.generateAuthToken=async function(){
    const user = this;
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET,{

      expiresIn: '24h' // expires in 365 days

 })
    const tokenObj=await Token.create({
      'token':token,
      'ownerId':user._id,
      'expiredAt':Date.now()+86400000  //24h
    })
    return tokenObj
}

userSchema.pre("save", async function (next) {
  const user = this;
  
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  
  next()
});

const User = mongoose.model('User', userSchema);

module.exports = User
