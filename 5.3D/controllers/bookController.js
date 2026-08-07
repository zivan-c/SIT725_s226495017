const bookService = require('../services/bookService');

async function getBookList(req, res){

    try{
        const books = await bookService.getBookList();
        res.status(200).json({
            status: 200,
            data: books,
            message: 'Books list retrieved'
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            messsage: 'Error fetching books',
            error: err.message
        })

    }
}

async function getBookById(req, res) {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);

        if (!book) {
            return res.status(404).json({
                status: 404,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            status: 200,
            data: book,
            message: 'Book details retrieved'
        });
    } catch (err) {
        console.error('Error in getBookById:', err);
        res.status(500).json({
            status: 500,
            message: 'Error fetching book details',
            error: err.message
        });
    }
}


async function addBook(req, res){

    try{

        const result = await bookService.addBook(req.body);
        return res.status(201).json({
            status: 201,
            data: result,
            message: 'Book added successfully'
        })

    } catch (err) {
        if(err.name === 'ValidationError' || err.name === 'CastError') {
            return res.status(400).json({
                status: 400,
                message: 'Validation Failed',
                error: err.message
            })
        }

        if(err.code === 11000){
            return res.status(409).json({
                status: 409,
                message: 'Book with this ID already exists',
                error: err.message
            })
        }

        return res.status(500).json({
            status: 500,
            message: 'Error in adding book',
            error: err.message
        })
    }
}

async function updateBook(req, res){

    try{
        const { id } = req.params;

        if (req.body.id && req.body.id !== id){
            return res.status(400).json({
                status: 400,
                message: 'Validation Failed. ID is immmutable'
            })
        }

        const result = await bookService.updateBook(id, req.body);

        if(!result){
            return res.status(404).json({
                status: 404,
                message: 'Book not found'
            })
        }

        return res.status(200).json({
            status: 200,
            data: result,
            message: 'Book updated successfully'
        })
    } catch (err) {

        if(err.name === 'ValidationError' || err.name === 'CastError'){
            return res.status(400).json({
                status: 400,
                message: 'Validation Failed',
                error: err.message
            })
        }
        return res.status(500).json({
            status: 500,
            message: 'Error in updating book',
            error: err.message
        })
    }
}

module.exports = {
    getBookList,
    getBookById,
    addBook,
    updateBook
}