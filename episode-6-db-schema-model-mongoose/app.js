const express = require('express');
const app = express();
const connectDB = require('./config/database');
const {
  notFound404,
  centeralizedErrorMiddleware,
} = require('./middleware/middleware');
const User = require('./models/users');

app.get('/test', (req, res) => {
  throw new Error('error in test route');
});

app.post('/signup', async (req, res, next) => {
  const user = new User({
    firstName: 'akshai',
    lastName: 'saini',
    emailId: 'akshay@gmail.com',
    password: 'kjfjafjf2f',
  });
  try {
    await user.save();
    res.send('data save into db successfully!');
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
