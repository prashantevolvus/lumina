const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    next();
  } catch (err) {
    console.error('Token is not valid');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
