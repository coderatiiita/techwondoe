const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const companies = require('./routes/companies');
const teams = require('./routes/teams');

//Configure .env
require('dotenv').config();

// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/companies', companies);
router.use('/teams', teams);

router.post('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'shubhvash',
        email: 'shubh@gmail.com'
    };

    jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json({
            token
        });
    });
});

module.exports = router;