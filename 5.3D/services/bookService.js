const bookList = require('../models/bookModel')

async function getBookList(){
    return await bookList.find({});
}

async function getBookById(id) {
    return await bookList.findOne({id : id});
}

async function addBook(bookData){

    const newBook = new bookList(bookData);
    return await newBook.save();

}

async function updateBook(id, updateData){

    return await bookList.findOneAndUpdate(

        { id: id },
        { $set: updateData },
        {
            new: true,
            runValidators: true,
            context: 'query'
        }
    
    );
}




module.exports = {
    getBookList,
    getBookById,
    addBook,
    updateBook
};