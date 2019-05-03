const Book = require('../models/book');

exports.getBookInfo = (req, res, next) => {
    const search = req.body.search;
    const filter = req.body.filter;
    let variable = {};
    switch(filter) {
        case "subject":
            variable = {subject: search};
            break;
        case "tag":
            variable = {tag: search};
            break;
        case "name":
            variable = {name: search};
            break;
        case "author":
            variable = {author: search};
            break;
    }
    Book.find(variable)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'books found successfully',
                books: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {  
            err.statusCode = 500;
            }
            next(err);
        });
}; 