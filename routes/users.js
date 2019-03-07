var express = require('express');
var router = express.Router();
var { getUser } = require('../service/userService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  const { userId } = req.body;
  if (userId) {
    res.json(getUser(userId));
  }
});

module.exports = router;
