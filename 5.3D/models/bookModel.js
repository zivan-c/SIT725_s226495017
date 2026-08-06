const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
        trim: true,
        minlength: [1, 'ID cannot be empty'] 
    },

    title: {
        type: String,
        required: [true, 'Title is required'], 
        trim: true,
        minlength: [1, 'Title cannot be empty']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        minlength: [1, 'Author cannot be empty'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [0, 'Year cannot be a negative number'],
        max: [2027, 'Cannot be a year beyond the current one'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        minlength: [1, 'Genre cannot be empty'],
    },
    summary: {
        type: String,
        required: [true, 'Summary is required'],
        trim: true,
        minlength: [1, 'Summary cannot be empty']
    },
    price: {
        type: mongoose.Decimal128,
        required[true, 'Price is required'],

    },
    currency: {type: String, default: 'AUD'} 

})

module.exports = mongoose.model('Book', bookSchema);