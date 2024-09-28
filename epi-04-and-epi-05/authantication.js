const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to namaste dev...');
});
app.get('/api/admin', (req, res) => {
  const token = 'xyz';
  const isAuthorized = token === 'xyzd';
  if (!isAuthorized) {
    res.status(401).send('You are not authorized person!');
  }
  res.send('you are admin access this route successfully...');
});
app.listen(3000, () => {
  console.log('server running on port 3000');
});
