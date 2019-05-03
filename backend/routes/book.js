const express = require('express');

const studentController = require('../controllers/student');

const router = express.Router();

router.post('/students', studentController.postStudentInfo);

router.post('/search', studentController.getStudentInfo);

router.post('/newBook', studentController.postBookinfo);

module.exports = router;


