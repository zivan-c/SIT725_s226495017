const bookService = require('../services/bookService');

async function getBookList(req, res){

    try{
        const books = await bookService.getBookList();
        res.json({
            status: 200,
            data: books,
            message: 'Books list retrieved'
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            messsage: 'Error fetching books',
            error: error.message
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

        res.json({
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

        const result = await bookService.addBook();


    } catch (err) {

    }

}


async function deleteBook(req, res){

    try{

        const { id } = req.params;
        const result = await bookService.deleteBook(id);

    } catch (err) {

    }
}

module.exports = {
    getBookList,
    getBookById,
    addBook,
    deleteBook
}