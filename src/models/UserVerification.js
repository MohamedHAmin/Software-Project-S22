const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userverificationschema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});


const UserVerification = mongoose.model('UserVerification', userverificationschema);

module.exports = UserVerification;