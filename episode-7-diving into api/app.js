const express = require('express');
const app = express();
const connectDB = require('./config/database');
const {
  notFound404,
  centeralizedErrorMiddleware,
} = require('./middleware/middleware');
const User = require('./models/users');

app.use(express.json());

app.get('/test', (req, res) => {
  throw new Error('error in test route');
});

app.post('/signup', async (req, res, next) => {
  // const user = new User({
  //   firstName: 'akshai',
  //   lastName: 'saini',
  //   emailId: 'akshay@gmail.com',
  //   password: 'kjfjafjf2f',
  // });
  const user = new User(req.body);
  try {
    await user.save();
    res.send('data save into db successfully!');
  } catch (error) {
    next(error);
  }
});
// find user by email id
app.get('/user', async (req, res, next) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    console.log(typeof users);
    if (users.length === 0) {
      console.log('inside the if /user');
      res.status(400).send('user with this email not found!!');
    } else {
      res.send(users);
    }
  } catch (error) {
    console.log('catch triggered in /user route');
    next(error);
  }
});
// FEED API GET - all the users data
app.get('/feed', async (req, res, next) => {
  try {
    const userData = await User.find({});
    console.log('userData==>', userData);
    res.send(userData);
  } catch (error) {
    next(error);
  }
});

app.use(notFound404);
app.use(centeralizedErrorMiddleware);

connectDB()
  .then(() => {
    console.log('successfully connected to DB');
    app.listen(3000, () => {
      console.log('listening on port 3000');
    });
  })
  .catch((err) => console.log(err));
