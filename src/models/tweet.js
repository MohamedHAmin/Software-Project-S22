
const { text } = require('express');
const mongoose =require('mongoose')
const validator =require('validator')

const tweetschema = new mongoose.Schema({
    
  shared:{
      type:Boolean,
      default:false
  },
<<<<<<< HEAD
  sharedtweet:{
    //populate if shared=true
      type: mongoose.Schema.Types.ObjectId,
=======
  replying_to:{
    type:mongoose.Schema.Types.ObjectId,
  },
  sharedtweet:{
    //populate if shared=true
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
>>>>>>> fa653b4d3d51e3e4669b060e69ad40c1342f0043
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
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId,
=======
          type: mongoose.Schema.Types.ObjectId,
>>>>>>> fa653b4d3d51e3e4669b060e69ad40c1342f0043
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