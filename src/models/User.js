const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Token = require("./Token");


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
    type: Date,
    default: 0,
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
    type: String,
    trim: true,
    default:null
  },
  banner:{
    type: String,
    trim: true,
    default:null
  },
  following:[{       ////who i follow //???
    followingId:{
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
      ref:'User'
    }
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
  
  
});
 ////to connect with tweet he tweet
userSchema.virtual('Tweet',{
  ref:'Tweet',
  localField:'_id',
  foreignField:'authorId'
})
userSchema.virtual('follower',{
  ref:'User',
  localField:'_id',
  foreignField:'following.followingId'
})

userSchema.statics.findByCredentials=async(emailorUsername,password)=>{
  var user=await User.findOne({email: emailorUsername}) 
  if(!user){
    user=await User.findOne({tag: emailorUsername})
    if(!user)
      throw new Error('unable to login')
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

  return userobject

}

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

userSchema.methods.generateAuthToken=async function(){
    const user = this;
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET)
    const tokenObj=await Token.create({
      'token':token,
      'ownerId':user._id
    })
    //user.tokens.concat({token})
    //await user.save()
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