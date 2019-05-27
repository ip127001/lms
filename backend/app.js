const path = require('path')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cron = require('node-cron');

const bookRoutes = require('./routes/book');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student')
const app = express();

// cron.schedule("1 * * * * *", function() {
//     console.log("running a task every minute");
// });


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'png' || file.mimetype === 'jpg' || file.mimetype === 'jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();;
});

app.use('/book', bookRoutes);
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);

app.use((error, req, res, next) => {
    console.log('error me hu me')
    console.log('error', error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({msg: message});
});

mongoose.connect('mongodb+srv://rk:9pnwE86CrIBYXaWH@ecommerce-rs4wl.mongodb.net/library?retryWrites=true')
    .then(result => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    })