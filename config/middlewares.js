const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(422).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function postCheck(req, res, next) {
  // Middleware to check if username and password are being provided
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ errorMessage: "Please provide a username and password!" });
  req.username = username;
  req.password = password;
  next();
}

function generateToken(user) {
  // Generates a token
  const payload = { userId: user.id };
  const options = { expiresIn: '1h' }

  return jwt.sign(payload, jwtKey, options);
}

module.exports = {
  authenticate,
  postCheck,
  generateToken
};
