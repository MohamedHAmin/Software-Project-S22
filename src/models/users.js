const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')


const userschema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    tirm: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("age must be postive");
      }
    },
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
  pann:{
    type:Date,
    
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
  profile_avater: {
    type: String,
    trim: true,
  
  },
  banner:{
    type: String,
    trim: true,


  },
  following:[{       ////who i follow
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
      ref:'user'
    }
   },  
   {timestamps:true,
   toJSON: {virtuals: true},
   toObject: { virtuals: true }}],
   
  followercount:{        /////who follow me
    type:Number,
    default:0

  },
  followedcount:{        ////who i follow
    type:Number,
    default:0
  },
  googleId:{
    type: String,
    trim: true,
  },
  Notifications:[{
    Notification:{
         text:{
          type: String,
          trim: true,
          //required:true
         },
         userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'user'
         }

    }
  }, { timestamps:true,
    toJSON: {virtuals: true}
    }],
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
  ,
  tokens: [{
      token:{
          type:String,
          //required: true
      }
  }]
},{
  timestamps:true,
  toJSON: {virtuals: true},
  toObject: { virtuals: true },
  
  
});
 ////to connect with tweet he tweet
userschema.virtual('Tweet',{
  ref:'Tweet',
  localField:'_id',
  foreignField:'userId'
})
userschema.virtual('follower',{
  ref:'user',
  localField:'_id',
  foreignField:'following.userId'
})
userschema.statics.findbycradenials=async(email,password)=>{
    const user=await User.findOne({email}) 
    if(!user){
        throw new Error('unable to login')
    }
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch){
        throw new Error("unable to login")
    }
    return user
}

///delete data before send to client
userschema.methods.toJSON=function(){
  const user = this
  const userobject=user.toObject()
  delete userobject.password
  delete userobject.tokens

  return userobject

}

userschema.methods.generateAuthToken=async function(){
    const user = this;
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

userschema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});



const User = mongoose.model('user', userschema);

module.exports = User
