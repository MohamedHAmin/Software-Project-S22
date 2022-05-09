const mongoose = require("mongoose");


const PrivateRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    requestUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
 
 
const PrivateRequest = mongoose.model('PrivateRequest', PrivateRequestSchema);     
module.exports = PrivateRequest