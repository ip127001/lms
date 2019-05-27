const express = require('express');

const studentController = require('../controllers/student');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/register', studentController.registerStudent);

router.post('/books', studentController.getBooksInfo);

router.post('/reissue', studentController.reissueBook);

router.get('/reissue', studentController.retrieveId);

router.get('/reissue-request', studentController.reissueOperation);

router.post('/reissue-accept', studentController.reissueAccept);

router.post('/reissue-reject', studentController.reissueReject);

router.post('/return-book', studentController.returnBookHandler);

router.post('/book-fine', studentController.bookFineHandler);

module.exports = router;


