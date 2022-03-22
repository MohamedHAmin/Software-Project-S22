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
      
      const Token = mongoose.model('Token', TokenSchema);
      
      module.exports = Token