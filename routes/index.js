var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const { createToken } = require('../middlewares/authentication');
const { getUser } = require('../service/userService')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** login */
// router
router.post('/login', isValid, function(req, res, next){
  // default : HMAC SHA256
  const {userId, password} = req.body;
  const user = getUser(userId);
  if (user && user.password === password) {
    let token = createToken({ userId: user.userId, userName: user.userName });
    res.json(token);
  } else if (!user){
    throw new Error('아이디가 잘못 되었거나 사용자가 없음');
  } else if (user.password !== password) {
    throw new Error('패스워드가 잘못 됨');
  }
});

// validation
function isValid(req, res, next) {
  const {userId, password} = req.body;
  if(!userId) {
    throw new Error('userId not be null')
  }
  if(!password) {
    throw new Error('password not be null')
  }
  next();
}

router.post('/logout', function(req, res, next){
  res.json(200);
});

module.exports = router;
