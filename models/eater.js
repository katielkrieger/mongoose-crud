const mongoose = require("mongoose");
const db = require("./");

// need a schema
var eaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  favoriteTopping: String, // shorthand for the object above (with just type: String)
  tacos: [{
    ref: 'Taco',
    type: mongoose.Schema.Types.ObjectId
  }],
})

eaterSchema.pre('remove', function(next) {
  // find all tacoes that have an eater property which is the id of what I will remove
  db.Taco.remove({eater: this._id}).then(function(){
    next();
  }, function(err){
    next(err);
  });
});

// need a model
var Eater = mongoose.model('Eater', eaterSchema);

// export the model
module.exports = Eater;