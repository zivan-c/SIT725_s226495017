const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController')

router.get('/', bookController.getBookList);
router.get('/:id', bookController.getBookById)

module.exports = router;