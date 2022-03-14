
const mongoose =require('mongoose')

const commentSchema = new mongoose.Schema({

    userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'user'
    },
    msg:{
        type:String, 
        required:true,

    },
    reportOn:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
     ref:'user'
    }

},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const Comment = mongoose.model('report', commentSchema);
      
      module.exports = Comment