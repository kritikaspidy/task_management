const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/hashpassword');
const generateToken = require('../utils/token');

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'user',
    });

    const token = generateToken(user);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const profile = async (req, res) => {
  return res.status(200).json({
    message: 'Profile fetched successfully',
    user: req.user,
  });
};

module.exports = {
  signup,
  login,
  profile,
};