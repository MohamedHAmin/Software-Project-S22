const mongoose =require('mongoose')

const tokenSchema = new mongoose.Schema({

    token:{
        type:String,
        default:null
      },
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const Token = mongoose.model('Token', tokenSchema);
      
      module.exports = Token