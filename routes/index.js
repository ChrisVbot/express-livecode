var express = require('express');
var router = express.Router();
var db = require("../models/index");


router.get('/', function(req, res, next) {
  var username = req.session.username
  //do a get request, initialize the ace editor with the data
  var randDocArr = []
  var randomDoc = db.Document
  //todo: randomize id #
    .findAll({
      where: {id: 1}
    })
    .then(function(data){
      console.log(data[0].dataValues);
      randDocArr.push(data[0].dataValues);
      res.render('index', { username: username, randomDoc: randDocArr[0]});
    });
});



module.exports = router;
