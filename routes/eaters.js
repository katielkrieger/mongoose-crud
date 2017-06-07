var express = require("express");
var router = express.Router();
var db = require("../models"); // index is redundant since it will default to a file called 'index.js'

router.get('/', function(req,res,next){
  db.Eater.find().then(function(eaters){
    res.render('eaters/index', {eaters}); // not a relative path!
  }, function(err){
    next(err);
  })
})

router.get('/new', function(req,res,next){
    res.render('eaters/new');
})

router.get('/:id', function(req,res,next){
  db.Eater.findById(req.params.id).then(function(eater){
    res.render('eaters/show', {eater}); 
  }, function(err){
    next(err);
  })
})

router.get('/:id/edit', function(req,res,next){
  db.Eater.findById(req.params.id).then(function(eater){
    res.render('eaters/edit', {eater}); 
  }, function(err){
    next(err);
  })
})

router.post('/', function(req,res,next){
  db.Eater.create(req.body.eater).then(function(){ // create returns nothing
    res.redirect('/eaters') // the path
  }, function(err){
    next(err);
  })
})

router.patch('/:id', function(req,res,next){
  // find by id  - req.params.id
  // update with - req.body.eater
  db.Eater.findByIdAndUpdate(req.params.id, req.body.eater, {new:true}).then(function(eater){ 
    // the eater we get back will not be updated
    // need to pass in the {new: true} to get the updated version here (optional)
    res.redirect('/eaters') 
  }, function(err){
    next(err);
  })
})

router.delete('/:id', function(req,res,next){
  // find by id  - req.params.id
  // update      - req.body.eater
  db.Eater.findById(req.params.id).then(function(eater){
    // eval(require("locus"))
    eater.remove(function(err){ // could also do as a Promise
      eval(require("locus"))
      res.redirect('/eaters') 
    })
  }, function(err){
    next(err)
  })
})

module.exports = router;
