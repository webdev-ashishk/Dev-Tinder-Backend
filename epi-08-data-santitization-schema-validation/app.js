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

app.post('/signup', async (req, res) => {
  try {
    await User.create(req.body);
    res.send('data save into db successfully!');
  } catch (error) {
    res.status(400).send('catch block exectured' + error.message);
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
    if (userData.length === 0) {
      res.status(404).send('not data found');
    } else {
      res.send(userData);
    }
  } catch (error) {
    next(error);
  }
});
// Delete a user by ID
app.delete('/user/:userID', async (req, res, next) => {
  const userID = req.params.userID; // send by client
  try {
    const deletedUser = await User.findByIdAndDelete(userID);
    console.log(deletedUser);
    res.send('User is deleted successfully');
  } catch (err) {
    res.status(400).send('Id are not found in DB');
  }
});

// update the firstName of the User .
app.patch('/user/:userID', async (req, res) => {
  const id = req.params.userID;
  const getDataFromTheBody = req.body;
  try {
    const ALLOWED_UPDATE = [
      'firstName',
      'password',
      'age',
      'photoUrl',
      'about',
      'skills',
    ];
    const isUpdateAllowed = Object.keys(getDataFromTheBody).every((key) =>
      ALLOWED_UPDATE.includes(key)
    );
    console.log(`isUpdateAllowed status : ${isUpdateAllowed}`);
    if (isUpdateAllowed) {
      const updatedData = await User.findByIdAndUpdate(id, getDataFromTheBody, {
        runValidators: true,
      });
      console.log(`update ${updatedData}`);
      res.send('data update successfully');
    }
    if (!isUpdateAllowed) {
      throw new Error('update not allowed !!');
    }
    if (data?.skills.length > 10) {
      throw new Error(`more than 10 skills not allowed !`);
    }
  } catch (error) {
    res.status(400).send(` catch block - ${error.message}`);
  }
});

// update the Data of the User
app.put('/user/:userID', async (req, res) => {
  const userID = req.params.userID;
  const data = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(userID, data);
    res.send('document is updated ....');
  } catch (error) {
    res.status(400).send('user id not found');
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
