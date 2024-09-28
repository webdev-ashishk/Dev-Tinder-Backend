const notFound404 = (req, res) => {
  res.send('searching route is not present !');
};

const centeralizedErrorMiddleware = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('something wend wrong!');
};

module.exports = { notFound404, centeralizedErrorMiddleware };
