const mongoose =require('mongoose')

const reportSchema = new mongoose.Schema({

    reporterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    msg:{
        type:String  
    },
    type:{
        type:String,
        enum:["tweet","user"],
        required:true
    },
    reportedId:{
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