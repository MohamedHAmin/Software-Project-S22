
const mongoose =require('mongoose')

const NotificationSchema = new mongoose.Schema({
    text:{
        type: String,
        trim: true,
        required:true
       },
       userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
       }
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const Report = mongoose.model('Report', reportSchema);
      
      module.exports = Report