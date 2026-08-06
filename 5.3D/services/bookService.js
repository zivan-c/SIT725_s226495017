const bookList = require('../models/bookModel')

async function getBookList(){
    return await bookList.find({});
}

async function getBookById(id) {
    return await bookList.findById(id);
}




module.exports = {

    getBookList,
    getBookById
    
};