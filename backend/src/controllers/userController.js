const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const { generateToken } = require('../middleware/auth');
      const token = generateToken(user._id);
      
      res.json({ 
        message: 'Login successful', 
        token,
        user: { id: user._id, username: user.username, email: user.email } 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };