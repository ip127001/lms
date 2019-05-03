const express = require('express');

const studentController = require('../controllers/student');
const bookController = require('../controllers/book');

const router = express.Router();

router.post('/students', studentController.postStudentInfo);

router.post('/search', studentController.getStudentInfo);

router.post('/newBook', studentController.postBookinfo);

router.post('/books', bookController.getBookInfo);

module.exports = router;


