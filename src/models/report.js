
const mongoose =require('mongoose')

const reportSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    msg:{
        type:String  
    },
    type:{
        type:String,
        enum:["tweet","user"],
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
      
      const Report = mongoose.model('Report', reportSchema);
      
      module.exports = Report