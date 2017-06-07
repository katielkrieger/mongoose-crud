const mongoose = require("mongoose");
const db = require("./");

const tacoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  numToppings: Number,
  eater: {
    ref: 'Eater',
    type: mongoose.Schema.Types.ObjectId // the eater will be an id. We'll use Mongoose to populate this object later.
    // don't need to specify the 'many' in eater.js
    // this will allow us to do `taco.eater`, which will give us the id for that eater
    // to do `eater.tacos`, we'll have to change the Eaters schema through referencing.
  }
})

tacoSchema.pre('remove', function(next) { // intercepting the removal (pre-hook)
  // remove the id from the array of tacos for the eater of this taco
  var _this = this; // because in the second function, we lose the outer "this" (the specific taco)
  db.Eater.findById(this.eater).then(function(eater){ // "this.eater" is an ID - not populated
    eater.tacos.remove(_this._id); // use the remove method for arrays (given to us by Mongoose) - could also use .id
    eater.save(function(err){ // has to be a new line
      next();
    })
  })
  // Eater.remove({tacos: this._id}).exec();
});

const Taco = mongoose.model('Taco', tacoSchema);

module.exports = Taco;