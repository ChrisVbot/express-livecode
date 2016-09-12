var express = require('express');
var router = express.Router();
var db = require("../models/index");
var moment = require("moment")


router.get('/', function(req, res, next) {
  var username = req.session.username
  // //do a get request, initialize the ace editor with the data
  // var randDocArr = []
  // var randomDoc = db.Document
  // //todo: randomize id #
  //   .findAll({
  //     where: {id: 1}
  //   })
  //   .then(function(data){
  //     randDocArr.push(data[0].dataValues);
  //     res.render('index', { username: username, randomDoc: randDocArr[0]});
  //   });
  res.render('index', {username: username});
});

router.get('/profile', function(req, res, next) {
  db.User
    .findById(req.session.user_id)
    .then(function(user){
      user
        .getDocuments({
          include:[{
            model: db.User,
            as: "Owner",
            attributes: ["username"]
          }]
        })
        .then(function(docs){
          var username = user.username;
          var docs = docs.map(doc => doc.dataValues);
          res.render('profile', {docs: docs, username: req.session.username, moment});
      });
    })
    .catch(function(err){
      res.render('error');
  });
});

module.exports = router;
