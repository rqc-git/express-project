const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/lagou');

module.exports = mongoose;
