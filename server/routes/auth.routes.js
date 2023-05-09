const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const router = express.Router();

const validateEmail = (email) => {
  const pattern = /^\S+@\S+\.\S+$/i;
  return pattern.test(email)
}

const validatePassword = (password) => {
  if(password.length === 0 || password.length < 7 || password.length > 30) {
    return false;
  }
  return true;
}

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: 'Bad login information' });
      return;
    }

    // get credentials
    const {email, password} = req.body;

    // add simple validation
    if(!validateEmail(email)){
      return res.status(401).json({ success: false, error: 'Invalid email' });
    }
    if(!validatePassword(password)){
      return res.status(401).json({ success: false, error: 'Password must be between 7 and 30 characters' });
    }

    // get user from db
    const user = await User.findOne({email: email});
    if(!user){
      return res.status(401).json({ success: false, error: 'Invalid email' });
    }

    // compare passwords
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // return user id as token for simplicity.
    res.status(200).json({ success: true, email: email, token: user._id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error' });
  }
})

// register expects email/password
// successful registration returns email and a fake token (user id)
router.post('/register', async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ success: false, error: 'Missing credentials' });
    }

    // extract credentials
    const {email, password} = req.body;

    // verify email does not exist in db
    let user = await User.findOne({email: email});
    if(user){
      return res.status(400).json({ success: false, error: 'Email already used'});
    }

    // hash password
    const hash = await bcrypt.hash(password, 12);

    // create user mongo document
    user = new User({email: email, password: hash});
    user = await user.save();

    // return 'token' but use the user id for simplicity.
    res.status(200).json({ success: true, user: {email: user.email, token: user._id}});

  } catch (error) {
    return res.status(500).json({ success: false, error: 'Unknown error'});
  }
})

module.exports = router;