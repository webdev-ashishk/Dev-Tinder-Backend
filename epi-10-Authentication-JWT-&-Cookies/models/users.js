const { default: mongoose } = require('mongoose');
var validator = require('validator');
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, 'error cached by schema - > write more than 4 character'],
      maxLength: [
        50,
        'error-catched by schema level , please remove some character from the name ',
      ],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, 'error cached by schema - > write more than 4 character'],
      maxLength: [
        50,
        'error-catched by schema level , please remove some character from the name ',
      ],
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
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Invalid photo URL ... ' + value);
        }
      },
    },
    age: {
      type: Number,
      trim: true,
      min: [18, 'write age greater than 18'],
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error('Your gender data is not valid');
        }
      },
    },
    photoUrl: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Invalid photo URL ... ' + value);
        }
      },
    },
    about: {
      type: String,
      trim: true,
      default: 'This is default About section of the USER!',
    },
    skills: {
      trim: true,
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
