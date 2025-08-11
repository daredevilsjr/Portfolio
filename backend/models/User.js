const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
   },
   password: {
      type: String,
      required: true,
      minlength: 4
   },
   role: {
      type: String,
      enum: ['admin'],
      default: 'admin'
   }
}, {
   timestamps: true
});

module.exports = mongoose.model('User', userSchema);