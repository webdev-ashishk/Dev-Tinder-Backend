const { default: mongoose } = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

UserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, 'DEV@Tinder@790', {
    expiresIn: '1h',
  });
  return token;
};

UserSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
module.exports = mongoose.model('User', UserSchema);
