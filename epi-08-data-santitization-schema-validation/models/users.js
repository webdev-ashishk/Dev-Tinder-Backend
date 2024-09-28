const { default: mongoose } = require('mongoose');
var validator = require('validator');
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 40,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true, // remove the white space inside the email
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email address ... ' + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Invalid photo URL ... ' + value);
        }
      },
    },
    age: {
      type: Number,
      min: [18, 'write age greater than 18'],
    },
    gender: {
      type: String,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error('Your gender data is not valid');
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Invalid photo URL ... ' + value);
        }
      },
    },
    about: {
      type: String,
      default: 'This is default About section of the USER!',
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
