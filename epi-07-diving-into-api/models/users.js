const { default: mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Converts the email to lowercase
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Regex to validate email
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gendar: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
