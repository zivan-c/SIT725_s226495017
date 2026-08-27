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
        max: [new Date().getFullYear(), 'Cannot be a year beyond the current year'],
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
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Price is required'],
        get: v => (v ? v.toString() : v),
        validate: {
            validator: function (v) {
                if (v == null || v === undefined) return false;
                const val = parseFloat(v.toString());
                return !isNaN(val) && val >= 0;
            },
            message: 'Price must be a valid non-negative number'
        }
    },
    currency: {
        type: String, 
        required: [true, 'Currency is required'],
        enum: ['AUD']
    } 

}, {
    strict: 'throw',
    toJSON: {
        getters: true,
        transform(_doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        getters: true
    }

})

module.exports = mongoose.model('Book', bookSchema);