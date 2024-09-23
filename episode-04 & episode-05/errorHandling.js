const express = require('express');
const app = express();

// A route that throws an error intentionally
app.get('/error', (req, res) => {
  throw new Error('error on the error route');
});
app.get('/test', (req, res, next) => {
  // Simulate a server error by throwing an exception
  try {
    throw new Error('error inside the test route');
  } catch (error) {
    next(error);
  }
});

// A route that returns some data
app.get('/data', (req, res) => {
  res.send('Here is some data.');
});

// Catch-all for undefined routes (404 Not Found)
app.use((req, res) => {
  res.status(404).send('404: Route Not Found');
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error for debugging
  res.status(500).send('Something broke!'); // Sends a 500 Internal Server Error response
});
// route specific error handling ..
app.use('/', (err, req, res, next) => {
  console.error(err.stack); // Logs the error for debugging
  res.status(500).send('Something broke!'); // Sends a 500 Internal Server Error response
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
