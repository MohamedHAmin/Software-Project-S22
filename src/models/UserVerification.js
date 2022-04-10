const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userverificationschema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required : true
  },
  uniqueString: {
    type: String
  },
  email:{
    type:String
  }
});

userverificationschema.pre("save", async function (next) {
    const userVerify = this;

      userVerify.uniqueString = await bcrypt.hash(userVerify.uniqueString, 10);
      
    
    next()
  });

const UserVerification = mongoose.model('UserVerification', userverificationschema);

module.exports = UserVerification;