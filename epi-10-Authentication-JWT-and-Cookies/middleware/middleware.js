const cookies = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const notFound404 = (req, res) => {
  res.send('searching route is not present !');
};

const centeralizedErrorMiddleware = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('something wend wrong!');
};

const userAuth = async (req, res, next) => {
  // read the tokens from the req.cookies .
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error('token is not valid');
    }
    // varify the token .
    const isTokenValid = await jwt.verify(token, 'DEV@Tinder@790');
    const { _id } = isTokenValid;
    // fetch the user from the DB .
    const userProfile = await User.findById(_id);
    if (!userProfile) {
      throw new Error('user is not present in db');
    }
    req.userProfile = userProfile; // remember this things .... very important
    next();
  } catch (error) {
    res.status(400).send(`catch block is executed:: ${error.message}`);
  }
};

module.exports = { notFound404, centeralizedErrorMiddleware, userAuth };
