require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const isUserLogedIn = async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ error: 'Please login' });
    }

    // Verify token properly (checks signature + expiry)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found, please login again' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = isUserLogedIn;
