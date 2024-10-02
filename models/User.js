const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'] // Minimum password length of 6 characters
  },
  image: {
    type: String, // Store image URL or path as a string
    required: false // This field is optional
  }
}, { timestamps: true });


module.exports = model('User', userSchema);
