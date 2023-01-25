const jwt = require('jsonwebtoken');
const secret = process.env.secret_key;

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: 'access denied',
    });
  }

  try {
    token = token.split(' '[1]);
    if (token === null || !token) {
      res.status(401).json({
        message: 'access denaid',
      });
    }

    let verifiedUser = jwt.verify(token, secret);
    req.user = verifiedUser;

    next();
  } catch (err) {
    res.status(401).json({
      message: err,
    });
  }
};

const checkRole = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(401).json({
      message: 'access denaid',
    });
  }
  next();
};

module.exports = { verifyToken, checkRole };
