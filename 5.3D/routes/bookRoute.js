const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController')

router.get('/', bookController.getBookList);
router.get('/:id', bookController.getBookById);

router.post('/', bookController.addBook);
router.put('/:id', bookController.deleteBook)

module.exports = router;