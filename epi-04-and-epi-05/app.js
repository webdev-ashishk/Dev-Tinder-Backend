const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json('welcome to JSON ...');
  res.send('welcome to Namste route...');
});

function routeHandler1(req, res, next) {
  console.log('first-route-handler');
  next();
}
function routeHandler2(req, res, next) {
  console.log('second-route-handler');
  next();
  // res.send('2nd Response...');
}
function routeHandler3(req, res) {
  console.log('third-route-handler');
  res.send('3d Response....');
}
app.use('/user', [routeHandler1, routeHandler2, routeHandler3]);

app.use('/user2', (req, res, next) => {
  console.log('handle the first route of user2');
  next();
});
app.use('/user2', (req, res) => {
  console.log('handle the second route of user2');
  res.send('2nd route handler response');
});
// why do we need middlewares ?

app.use('/admin', (req, res, next) => {
  console.log('authorization checked!');
  const token = 'xyz';
  const isAuthorized = token === 'xyzd';
  if (!isAuthorized) {
    res.status(401).send('you are not authorized person');
  } else {
    next();
  }
});
app.get('/admin/getAllData', (req, res) => {
  res.send('all Data send');
});

app.delete('/admin/deleteUser', (req, res) => {
  res.send('delete a user');
});
// error handling in expressjs

// const notFoundHandler = (req, res) => {
//   res.status(404).json({
//     error: 404,
//     message: 'Route not found.',
//   });
// };
// app.use(notFoundHandler);

app.use((req, res) => {
  res.status(404).send('404: Route Not Found');
});

app.listen(7777, () => {
  console.log('server is running on port 7777');
});
