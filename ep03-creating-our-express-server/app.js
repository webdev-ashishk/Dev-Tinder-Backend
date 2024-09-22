const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.send('you are the /  --------route');
});

app.use('/hello', (req, res) => {
  res.send('you are the /hello --------route');
});

app.use('/test', (req, res) => {
  res.send('you are the /test --------route');
});

app.listen(7777, () => {
  console.log('server is running on port 7777');
});
