var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next){
  // default : HMAC SHA256
  let token = jwt.sign({
    userId: 'test'
  },
  secretObj.scret,
  {
    expiresIn: '5m'
  });
  res.send(token);

})

module.exports = router;
