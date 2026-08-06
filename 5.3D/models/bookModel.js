const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    id: {type: String},
    title: {type: String},
    author: {type: String},
    year: {type: Number},
    genre: {type: String},
    summary: {type: String},
    price: {type: mongoose.Decimal128},
    currency: {type: String, default: 'AUD'} 

})

module.exports = mongoose.model('Book', bookSchema);