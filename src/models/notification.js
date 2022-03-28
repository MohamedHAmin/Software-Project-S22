const mongoose =require('mongoose')

const notificationSchema = new mongoose.Schema({

    text:{
        type: String,
        trim: true,
        //required:true
       },
    notifiedUid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
       }},
    
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
      
      const Notification = mongoose.model('Notification', notificationSchema);
      
      module.exports = Notification