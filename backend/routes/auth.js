const express = require('express');
const { body } = require('express-validator/check');

const Student = require('../models/student');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('please enter a valid email addres')
        .custom((value, { req }) => {
            return User.findOne({email: value}).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('email address already exists');
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('name')
        .trim()
], authController.signup);

router.post('/login', authController.login);

module.exports = router;