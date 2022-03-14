
const { text } = require('express');
const mongoose =require('mongoose')
const validator =require('validator')

const tweetschema = new mongoose.Schema({
    
  replyed:{
    type:Boolean,
    default:false
  },
   replieduser:{
    type: mongoose.Schema.Types.ObjectId,
    default:NULL
   },
  userId:{
        type: mongoose.Schema.Types.ObjectId,
    },  
    Text:{
      type:String,
      trim:true,
      required:true
  },
  retweet:[{
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'user'
    }
   }]
  ,
  tags:[{
    tag:{
      
        type: string,
        required:true,
       
      }
  }],
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