const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyname:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber:{
    type:Number,
    required:true,
    unique:true,
  },
  userid: {
    type: Number,
    required: true,
    unique: true,
  },
  employeesize:{
    type:Number
  },
  emailotp:{
    type: Number,

  },
  numberotp:{
    type:Number,
  },
  otpCreatedAt: {
    type: Date,
  },
  otpExpiryTime: {
    type: Date,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  }
});


const User = mongoose.model('Company', companySchema);

module.exports = User;