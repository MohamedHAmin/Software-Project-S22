
const { text } = require('express');
const mongoose =require('mongoose')
const validator =require('validator')

const tweetschema = new mongoose.Schema({
    
  replying_to:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Tweet',
    default:null
  },
  userId:{
      type: mongoose.Schema.Types.ObjectId,
  },  
  Text:{
      type:String,
      trim:true,
      required:true
  },
  retweet:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Tweet',
      default:null
  },
  tags:[{
    tag:{
      
        type: String,
        required:true,
       
      }
  }],
  likeCount:{
    type:Number
  },
  retweetCount:{
    type:Number
  },
  replyCount:{
    type:Number
  },
  likes:[{like:{
      
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
      
  }},{
    timestamps:true,
    toJSON: {virtuals: true}
  }]
 
},{
  timestamps:true,
  toJSON: {virtuals: true}
  
});



const Tweet = mongoose.model('Tweet', tweetschema);

module.exports = Tweet