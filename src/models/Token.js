const mongoose =require('mongoose')

const tokenSchema = new mongoose.Schema({

    token:{
        type:String,
        required:true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    expiredAt:{
        type:Date
    }
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const Token = mongoose.model('Token', tokenSchema);
      
      module.exports = Token