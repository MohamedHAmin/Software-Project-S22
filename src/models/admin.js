const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')

const adminSchema = new mongoose.Schema({

    admin_name: {
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
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("not valid email");
          }
        },
      },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
      },
    tokens:[{
      token:{
        type:String,
        default:null
      }
    }]
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
 
adminSchema.methods.generateAdminToken=async function(){
  const admin = this;
  const token=jwt.sign({_id:admin._id.toString()},process.env.SECRET)
  admin.tokens=admin.tokens.concat({token})
  await admin.save()
  return token
}
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next()
});
      
const Admin = mongoose.model('Admin', adminSchema);     
module.exports = Admin