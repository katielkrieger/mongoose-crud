const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/mongoose-crud');
mongoose.Promise = global.Promise; 
// By default, Mongoose does not have its own way of handling promises.
// `global` is optional.

module.exports.Eater = require('./eater'); 
module.exports.Taco  = require("./taco");