const mongoose =require('mongoose')

const   LikeSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
        
    },
    tweetId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Tweet'
      }
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const Like = mongoose.model('Like', LikeSchema);
      
      module.exports = Like