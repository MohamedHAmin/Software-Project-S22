const mongoose =require('mongoose')

const   TokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,    
        ref:'user'
    },
},
{
    timestamps:true,
    toJSON: {virtuals: true}      
 });
      
      const Token = mongoose.model('Token', reportSchema);
      
      module.exports = Token