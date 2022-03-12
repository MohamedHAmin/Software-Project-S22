
const mongoose =require('mongoose')

const commentSchema = new mongoose.Schema({

    userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
    },
    msg:{
        type:Text  
    },type:{
        type:Enum["tweet","comment","user"],
    required:true
    },
    reportOn:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
    }

},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const Comment = mongoose.model('Comment', commentSchema);
      
      module.exports = Comment