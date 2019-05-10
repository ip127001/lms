const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log('authheader', authHeader);
    if (!authHeader) {
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secrethosktahai');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    req.isUser = decodedToken.isUser;
    console.log('decodedToken', decodedToken);
    next();
}