const mongoose =require('mongoose')

const   TokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
        
    },
},
{
    timestamps:true,
    toJSON: {virtuals: true}      
 });
      
      const token = mongoose.model('Token', reportSchema);
      
      module.exports = token