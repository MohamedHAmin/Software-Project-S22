
const { text } = require('express');
const mongoose =require('mongoose')
const validator =require('validator')

const tweetschema = new mongoose.Schema({
    
  shared:{
      type:Boolean,
      default:false
  },
  replying_to:{
    type:mongoose.Schema.Types.ObjectId,
  },
  sharedtweet:{
    //populate if shared=true
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
      default:null
  },
  userId:{
      type: mongoose.Schema.Types.ObjectId,
    },  
  Text:{
      type:String,
      trim:true
  },
  hashtags:{
     type:Array,
  },
  tags:{
      type:Array,
      trim:true
  },
  likes:[{like:{
      react:{
          type:String
      },
      userId:{
          type: mongoose.Schema.Types.ObjectId,
      },
      name:{
          type:String
      }
  }},{
    timestamps:true,
    toJSON: {virtuals: true}
  }]
 
},{
  timestamps:true,
  toJSON: {virtuals: true}
  
});

tweetschema.virtual('Comment',{
    ref:'Comment',
    localField:'_id',
    foreignField:'commenton'
})

const Tweet = mongoose.model('Tweet', tweetschema);

module.exports = Tweet