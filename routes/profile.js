var express = require('express');
var router = express.Router();
var db = require("../models/index");
var moment = require('moment');

/* GET users listing. */

router.get('/', function(req, res, next) {
  var documents = db.User
    .findById(req.session.user_id)
    .then(function(user){
      user
        .getDocuments({})
        .then(function(docs){
          var username = user.username;;
          var docs = docs.map(doc => 
            doc.dataValues
            );
          console.log(docs);
          res.render('profile', {docs: docs, username: req.session.username, moment: moment });
      });
    })
    .catch(function(err){
      res.render('error');
  });
});

router.post('/rename', function(req,res,next) {
  var title = req.body
  console.log(req.body);
  db.Document
    .findById(title.docId)
    .then(function(doc){
      doc.updateAttributes({
        name: title.newTitle
      })
    })
    .then(function(){
      res.sendStatus(200);
    })
    .catch(function(err){
      res.sendStatus(500);
    });
});


router.get('/contributors', function(req, res){
  var docId = req.query.documentId
  db.Document
    .findById(docId, {
      include: [{
        model: db.User,
        attributes: ["id", "username"]
      }]
    })
    .then(function(doc){
      res.send(doc);
    })
});




module.exports = router;
