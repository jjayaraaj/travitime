const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true
  },
  mobile: {
    type: Number,
    required: true
  },
  country: {type: String, required: true},
  date: {type: Date, default: Date.now},
  isActive: {type: Boolean, default: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)
