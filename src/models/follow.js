
const mongoose =require('mongoose')

const   followSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
        
    },
    followto:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
      }
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const follow = mongoose.model('Follow', followSchema);
      
      module.exports = follow