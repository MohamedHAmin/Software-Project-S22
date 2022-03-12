
const { text } = require('express');
const mongoose =require('mongoose')
const validator =require('validator')

const tweetschema = new mongoose.Schema({
    
  shared:{
    type:Boolean,
    default:false
  },
   shareduser:{
    type: mongoose.Schema.Types.ObjectId,
    default:NULL
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
      tirm:true
  },
  likes:[{like:{
      react:{
          type:String
      },
      userId:{
        type: mongoose.Schema.Types.ObjectId,
      },name:{
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