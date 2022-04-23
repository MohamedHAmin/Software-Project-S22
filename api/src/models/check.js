const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Token = require("./Token");

const checkSchema = new mongoose.Schema({
    check: {
        type: String,
        required: true,
        trim: true
    },
    
},
{
    timestamps:true,
    toJSON: {virtuals: true}
        
 });
 
 

const check = mongoose.model('check', checkSchema);     
module.exports = check