const express = require('express');
const app = express();
const connectDB = require('./config/database');
const {
  notFound404,
  centeralizedErrorMiddleware,
  userAuth,
} = require('./middleware/middleware');
const User = require('./models/users');
const validateSignUpData = require('./utils/validate');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
  try {
    // validate req
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      age,
      photoUrl,
      skills,
    } = req.body;

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // create new user instance
    await User.create({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      age,
      photoUrl,
      skills,
    });
    res.send('data save into db successfully!');
  } catch (error) {
    res.status(400).send('catch block exectured :: ' + error.message);
  }
});
app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('invalid credencials');
    } else if (user) {
      const isPasswordValid = await bcrypt.compare(password, user?.password);
      if (isPasswordValid) {
        //create a JWT token .
        const token = await jwt.sign({ _id: user._id }, 'DEV@Tinder@790');
        console.log(token);
        // add token to cookie and send the response back to the user .
        res.cookie('token', token);
        res.send('login successfully');
      } else {
        throw new Error('invalid credencials');
      }
    }
  } catch (error) {
    res.status(400).send('error in catched block ' + error.message);
  }
});
app.get('/profile', userAuth, async (req, res) => {
  try {
    const userProfile = req.userProfile;
    res.send(userProfile);
  } catch (error) {
    res.status(400).send(`catch block executed----- ${error.message}`);
  }
});
// find user by email id

// FEED API GET - all the users data
connectDB()
  .then(() => {
    console.log('successfully connected to DB');
    app.listen(3000, () => {
      console.log('listening on port 3000');
    });
  })
  .catch((err) => console.log(err));
