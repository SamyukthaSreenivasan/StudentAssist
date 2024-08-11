const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'NZK64t&f9L(]pF<}'; // Replace with your secret key

// Register
router.post('/register', async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = new User({ userId, password });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.findOne({ userId });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).send('Error logging in');
    }
});

module.exports = router;
