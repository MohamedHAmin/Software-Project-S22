const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Token = require("./Token");
const Admin = require("./Admin")

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
  birthDate: {
   Date: {type: Date,},
   visability:{
    type:Boolean,
    default:true
   }
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
    default:null
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
  let admin=await Admin.findOne({ email: emailorUsername })
  if(admin){
    const ismatch=await bcrypt.compare(password,admin.password)
      if(ismatch){
        return admin
      }
  }
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
  return user}


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
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET)
    const tokenObj=await Token.create({
      'token':token,
      'ownerId':user._id
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