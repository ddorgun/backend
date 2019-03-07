const jwt = require('jsonwebtoken');
const secretKey = "babo";

function isAuthcenticated(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'access denided',
    });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.json({
        success: false,
        message: error,
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

function createToken(payload){
  let token = jwt.sign(
    payload,
    secretKey,
    {
      expiresIn: '5m'
    });
    return token;
}

module.exports = { isAuthcenticated, createToken };