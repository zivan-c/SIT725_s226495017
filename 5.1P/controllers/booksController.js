
const booksService = require('../services/booksService');


function getAllBooks(req, res) {
  const books = booksService.getAllBooks();
  res.json({
    status: 200,
    data: books,
    message: 'Food menu retrieved using service'
  });

  };

function getBookById(req, res) {
  const book = req.params.id;
  const actualBook = booksService.getBookById(book);

  if (actualBook != null){
    res.json({
      status: 200,
      data: actualBook,
      message: 'Here is the requested book'

    });
  } else {
    res.status(404).json({
      status: 404,
      message: 'Book with specified ID not found!'
    })
  }
  
}

module.exports = {
  getAllBooks,
  getBookById
}

