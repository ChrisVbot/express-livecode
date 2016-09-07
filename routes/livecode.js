var express = require('express');
var router = express.Router();
var db = require("../models/index");

/* GET users listing. */

router.get('/new', function(req, res, next){
  db.User
    .findById(req.session.user_id)
    .then(user=>{
      if(user){
        db.Document.create({
          name: "untitled",
          content: "",
          owned_id: req.session.user_id,
          language: "javascript"
        })
        .then(doc=>{
          doc.addUser(user);
          res.redirect('/livecode/' + doc.id);
        });
      } else {
        res.render("error");
      }
    });
});

router.get('/:id', function(req, res, next){
  db.Document.findById(req.params.id)
    .then(doc => {
      var editors = doc.getUsers()
        .then(function(users){
          var users = users.map(user=> user.dataValues);
          res.render('livecode', {
            content: doc.content,
            editors: users,
            username: req.session.username
          });
        });
    })
    .catch(function(err){
      res.redirect('/');
    });
});

router.get('/:id/reload', function(req, res, next){
  db.Document.findById(req.params.id)
    .then(function(doc){
      res.send(doc.content);
    })
    .catch(function(err){
      res.sendStatus(404);
    });
});

router.put('/:id', function(req,res,next){
  db.User.findById(req.session.user_id)
    .then(user=>{
      db.Document.findById(req.params.id)
        .then(doc=> {
          doc.hasUser(user)
            .then(result=>{
              if(result){              
                doc.content = req.body.content;
                doc.save()
                .then(function(doc){
                  res.sendStatus(200);
                });
              } else {
                console.log("result is false!");
                res.sendStatus(404);
              }
            });
        });
    });
});


// TODO: Implement a req.session.user_id check function to dry out code
// function checkUserId(req, callback){

// }

module.exports = router;
