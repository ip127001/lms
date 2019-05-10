const Student = require('../models/student');
const Book = require('../models/book');

exports.getStudentInfo = (req, res, next) => {
    console.log('search data', req.body);
    const search = req.body.search;
    Student.findOne({roll: search})
        .then(result => {
            res.status(201).json({
                message: 'student information found successfully',
                studentInfo: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {  
            err.statusCode = 500;
            }
            next(err);
        });
}

exports.postStudentInfo = (req, res, next) => {    
    console.log('postStudentInfo', req.body);

    const issueDate = req.body.dateOfIssue;
    const name = req.body.name;
    const rollNumber = req.body.roll;
    const semester = req.body.semester;
    const bookId = req.body.bookId;
    const branch = req.body.branch;
    const totalFine = 5;
    
    Book.findOne({id: bookId})
        .then(book => {
            console.log('no book found')
            if(book) {
                if(book.isAvailable) {
                    book.isAvailable = false;
                    book.reissueDate = issueDate;
                    book.save().then(book => {
                        const bookName = book.name;
                        Student.findOne({roll: rollNumber})
                            .then(student => {
                                let newArray = student.books;
                                newArray.push({
                                    "bookName": bookName,
                                    "bookId": bookId,
                                    "reIssueDate": issueDate,
                                    "fine": 0
                                })
                                student.name = name;
                                student.roll = rollNumber;
                                student.semester = semester;
                                student.branch = branch;
                                student.books = newArray;
                                student.totalFine = totalFine;
                                return student.save();
                            })
                            .then(result => {
                                res.status(201).json({
                                    message: 'student data updated successfully!',
                                    student: result
                                });
                            })
                            .catch(err => {
                                if (!err.statusCode) {  
                                err.statusCode = 500;
                                }
                                next(err);
                            });
                    }) 
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    res.status(403).json({
                        message: 'book already issued to someone else'
                    });
                }
            } else {
                res.status(404).json({
                    message: 'book not found'
                });
            }
        })
        .catch(err => {
            if (!err.statusCode) {  
                err.statusCode = 500;
                }
            next(err);
        });
}



exports.postBookinfo = (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const subject = req.body.subject;
    const id = req.body.id;
    const author = req.body.author;
    const fine = req.body.fine;
    const tag = req.body.tag;

    const book = new Book({
        name: name,
        subject: subject,
        id: id,
        author: author,
        fine: fine,
        tag: tag
    });
    book.save()
    .then(result => {
        res.status(201).json({
            message: 'book added successfully',
            result: result
        })
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    });
            
}