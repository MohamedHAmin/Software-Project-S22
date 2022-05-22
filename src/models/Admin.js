const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Token = require("./Token");

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required: true,
        lowercase: true,
        // validate(value) {
        //   if (!validator.isEmail(value)) {
        //     throw new Error("not valid email");
        //   }
        // }
    },
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
 
 adminSchema.methods.generateAuthToken=async function(){
  const admin = this;
  const token=jwt.sign({_id:admin._id.toString()},process.env.SECRET,{

    expiresIn: '24h' // expires in 1 day

})
  const tokenObj=await Token.create({
    'token':token,
    'ownerId':admin._id,
    'expiredAt':Date.now()+86200000  //24h

  })
  return tokenObj
}
 
const Admin = mongoose.model('Admin', adminSchema);     
module.exports = Admin