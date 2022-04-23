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
  },
  createdAt: {
    type:Date
  },
  expiresAt:{
    type:Date
  }

});


const UserVerification = mongoose.model('UserVerification', userverificationschema);

module.exports = UserVerification;