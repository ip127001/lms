const Student = require('../models/student');
const Book = require('../models/book');
const User = require('../models/user');
const Reissue = require('../models/reissue');

const mongoose = require('mongoose');

exports.getStudentInfo = (req, res, next) => {
    console.log('search data', req.body);
    const search = req.body.search;
    Student.findOne({roll: search})
        .then(result => {
            console.log(result)
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
    
    Book.findOne({idBook: bookId})
        .then(book => {
            console.log(book)
            if(book) {
                if(book.isAvailable) {
                    book.isAvailable = false;
                    book.reissueDate = issueDate;
                    book.save().then(book => {
                        const bookName = book.name;
                        Student.findOne({roll: rollNumber})
                            .then(student => {
                                console.log(student);
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
                const error = new Error();
                error.message = 'no book found';
                error.statusCode = 404;
                next(error);
            }
        })
        .catch(err => {
            const error = new Error();
            error.message = 'no book found';
            error.statusCode = 404;
            next(error);
        });
}



exports.postBookinfo = (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const subject = req.body.subject;
    const id = req.body.idBook;
    const author = req.body.author;
    const fine = req.body.fine;
    const tag = req.body.tag;

    const book = new Book({
        name: name,
        subject: subject,
        idBook: id,
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

exports.registerStudent = (req, res, next) => {
    console.log(req.body);
    const userId = req.body.userId;
    const roll = req.body.roll;
    const semester = req.body.semester;
    const branch = req.body.branch;

    const id = mongoose.Types.ObjectId(req.body.userId);
    User.findById(id)
        .then(user => {
            const name = user.name;
            const student = new Student({
                name: name,
                roll: roll,
                semester: semester,
                branch: branch
            });
            student.save()
                .then(result => {
                    res.status(201).json({
                        message: 'profile updated successfully',
                        result: result
                    })
                })
                .catch(err => {
                    if (!err.statusCode) {
                    err.statusCode = 500;
                    }
                    next(err);
                });
        })
        .catch(err => {
            if (!err.statusCode) {
            err.statusCode = 500;
            }
            next(err);
        });
    
}

exports.getBooksInfo = (req, res, next) => {
    console.log(req.body)
    const id = mongoose.Types.ObjectId(req.body.userId);
    User.findById(id)
        .then(user => {
            console.log(user.name)
            Student.findOne({name: user.name})
                .then(stu => {
                    console.log(stu.books)
                    res.status(200).json({books: stu.books})
                })
                .catch(err => { 
                    if (!err.statusCode) {
                    err.statusCode = 500;
                    }
                    next(err);
                });
        })
        .catch(err => {
            if (!err.statusCode) {  
            err.statusCode = 500;
            }
            next(err);
        });
}

exports.reissueBook = (req, res, next) => {
    let studentName;
    const id = mongoose.Types.ObjectId(req.body.book.userId);
    User.findById(id)
        .then(user => {
            const name = req.body.book.bookName;  
            const bookId = req.body.book.bookId;
            const fine = req.body.book.fine;
            const reissueDate = req.body.book.reIssueDate;
            studentName = user.name;
            reissueBookObj = {
                "name": name,
                "bookId": bookId,
                "fine": fine,
                "reissueDate": reissueDate
            }

            Student.findOne({name: studentName})
                .then(student => {
                    let reissueArray = student.reissuedBooks;
                    reissueArray.push(reissueBookObj)
                    return student.save();
                })
                .then(result => {
                    res.status(201).json({
                        message: 'student data updated successfully!',
                        result: result
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
            if (!err.statusCode) {  
            err.statusCode = 500;
            }
            next(err);
        });
}

exports.retrieveId = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.query.id);
    User.findById(id)
        .then(user => {
            studentName = user.name;

            Student.findOne({name: studentName})
                .then(student => {
                    res.status(201).json({
                        message: 'student data updated successfully!',
                        result: student.reissuedBooks
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
            if (!err.statusCode) {  
            err.statusCode = 500;
            }
            next(err);
        });
}

exports.reissueOperation = (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(201).json({
                message: 'student data retrieved successfully!',
                result: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {  
            err.statusCode = 404;
            }
            next(err);
        });
}

exports.reissueAccept = (req, res, next) => {
    Student.findOne({name: req.body.studentName})
        .then(student => {
            let updatedReBooks = student.reissuedBooks;
            let updatedBooks = student.books;
            let index1 = updatedReBooks.findIndex(book => book.bookId === req.body.bookId);
            updatedReBooks.splice(index1, 1);
            let index2 = updatedBooks.findIndex(book => book.bookId === req.body.bookId);
            const element = updatedBooks[index2];
            updatedBooks.splice(index2, 1);
            let today = new Date();
            let tomorrow = new Date(today.setMonth(today.getMonth() + 1));
            element.reIssueDate = tomorrow.toDateString();

            console.log(element);
            updatedBooks.push(element);
            student.books = updatedBooks;
            student.reissuedBooks = updatedReBooks;
            console.log('accept', updatedBooks, updatedReBooks);
            return student.save();
        })
        .then(result => {
            res.status(200).json({
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {  
            err.statusCode = 404;
            }
            next(err);
        });
}

exports.reissueReject = (req, res, next) => {
    Student.findOne({name: req.body.studentName})
        .then(student => {
            let updatedReBooks = student.reissuedBooks;
            let index1 = updatedReBooks.findIndex(book => book.bookId === req.body.bookId);
            updatedReBooks.splice(index1, 1);
            
            student.reissuedBooks = updatedReBooks;
            return student.save();
        })
        .then(result => {
            res.status(200).json({
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {  
            err.statusCode = 404;
            }
            next(err);
        });
}

exports.returnBookHandler = (req, res, next) => {
    console.log(req.body);
    Book.findOne({idBook: req.body.bookId})
    .then(book => {
        if(book) {
            book.isAvailable = true;
            book.reissueDate = null;
            book.save().then(book => {
                Student.findOne({roll: req.body.roll})
                    .then(student => {
                        console.log(student);
                        let newArray = student.books;
                        let index = newArray.findIndex(el => el.bookId === req.body.bookId);
                        newArray.splice(index, 1);
                        student.books = newArray;
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
        }
    })
    .catch(err => {
        if (!err.statusCode) {  
        err.statusCode = 500;
        }
        next(err);
    });
}

exports.bookFineHandler = async (req, res, next) => {
    console.log('reqbody', req.body.bookId, req.body);
    const bookData = await Book.findOne({idBook: req.body.bookId})  
    bookData.fine = req.body.fine;
    bookData.resissueDate = req.body.reIssueDate;
    const studenData = await Student.findOne({roll: req.body.roll}) 
    const resultDat = await bookData.save();  
    const newArr = [...studenData.books];
    const index = newArr.findIndex(el => el.bookId === req.body.bookId)
    newArr.push({
        "bookName": req.body.bookName,
        "bookId": req.body.bookId,
        "reIssueDate": req.body.reIssueDate,
        "fine": req.body.fine
    });
    newArr.splice(index, 1);
    console.log('newArr', newArr);
    studenData.books = newArr;
    const result = await studenData.save()
    console.log(result)
}