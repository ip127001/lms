const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('please enter a valid email addres')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('name')
        .trim()
], authController.signup);

router.post('/login', authController.login);

module.exports = router;