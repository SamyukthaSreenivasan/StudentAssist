const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'NZK64t&f9L(]pF<}'; // Replace with your secret key

// Middleware to check token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Example protected route
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is the user profile', user: req.user });
});

module.exports = router;
