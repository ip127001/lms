const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto');

const User = require('../models/user');
const College = require('../models/college');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: 'your_api_key'
    }
}));

exports.verifyUser = (req, res, next) => {
    console.log('verifyUser');
    console.log('params token', req.body.token);
    const token = req.body.token;
    User.findOne({authToken: token})
        .then(user => {
            user.isVerified = true;
            return user.save();
        })
        .then(result => {
            console.log(result);
            res.status(200).json({message: 'user verified', result: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err)
        })
}

exports.signup = (req, res, next) => {
    console.log('backedn controller');
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('validation failed');
        error.status = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    College.findOne({email: email})
        .then(student => {
            if(student) {
                console.log(student)
                User.findOne({email: student.email})
                    .then(user => {
                        if (!user) {
                            bcrypt.hash(password, 12)
                                .then(hashedPw => {
                                    const user = new User({
                                        email: email,
                                        password: hashedPw,
                                        name: name
                                    });
                                    return user.save();
                                })
                                .then(result => {
                                    crypto.randomBytes(32, (err, buffer) => {
                                        if (err) {
                                            console.log(err);
                                            const error = new Error('Signup failed');
                                            error.status = 422;
                                            error.data = errors.array();
                                            throw error;
                                        }
                                        const token = buffer.toString('hex');
                                        User.findOne({email: email})
                                            .then(user => {
                                                user.authToken = token;
                                                return user.save();
                                            })
                                            .then(result => {
                                                res.status(200).json({message: 'user Created', userId: result._id})
                                                transporter.sendMail({
                                                    to: email,
                                                    from: 'lms@college.com',
                                                    subject: 'Go to login page',
                                                    html: `<h1>You successfully signed up</h1>
                                                            <p>click on this <a href="http://localhost:3000/auth/${token}">link</a> to go to the login page</p>` 
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            });
                                    })
                                })
                                .catch(err => {
                                    const error = new Error('Signup failed, already registered with college');
                                    error.status = 403;
                                    throw error;
                                });
                        } else {
                            const error = new Error();
                            error.status = 403;
                            error.message = 'already registered';
                            throw error;
                        }
                    })
                    .catch(err => {
                        const error = new Error();
                        error.status = 403;
                        error.message = 'error while signup';
                        throw error;
                    })
            } else {
                res.status(404).json({
                    message: 'student is not registered with college'
                });
            }
        })
        .catch(err => {
            const error = new Error();
            error.status = 404;
            error.message = 'user is not registered with college';
            throw error;
        });
}

exports.adminSignup = (req, res, next) => {
    console.log('backend controller');
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('validation failed');
        error.status = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                name: name,
                isUser: false
            });
            return user.save();
        })
        .then(result => {
            console.log('result', result);
            res.status(200).json({message: 'user Created', userId: result._id})
        })
        .catch(err => {
            if (!error.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        });
}


exports.studentSignup = (req, res, next) => {
    console.log('studentSignup controller');
    console.log(req.body);
    const email = req.body.email;
    const name = req.body.name;
    const roll = req.body.roll;

    const college = new College({
        email: email,
        name: name,
        roll: roll
    });
    college.save()
    .then(result => {
        res.status(201).json({
            message: 'student added successfully',
            result: result
        });
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                const error = new Error();
                error.statusCode = 404;
                error.message = 'A user not found with that email';
                next(error);
            }
            if(!user.isVerified) {
                console.log('yha aya tha me')
                const error = new Error();
                error.message = 'User is not verified with the email address';
                error.statusCode = 403;
                next(error);
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error();
                error.message = "password doesn't match";
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
                },
                'secrethosktahai',
                { expiresIn: '1h' }
            );
            res.status(200).json({token: token, userId: loadedUser._id.toString(), isUser: loadedUser.isUser})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}
