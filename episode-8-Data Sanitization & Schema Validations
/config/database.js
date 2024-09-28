const mongoose = require('mongoose');
const url =
  'mongodb+srv://namasteNodeJS:VSx0fNNe1CJgHLpH@namastenode-by-webdev.awo3c.mongodb.net/devTinder';
const connectDB = async () => {
  await mongoose.connect(url);
};

module.exports = connectDB;
