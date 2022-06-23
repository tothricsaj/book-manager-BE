const { Router } = require('express')
const express = require('express')

const router = express.Router()

const bookStoreController = require('../controller/bookStore')

router.get('/', bookStoreController.homePage)

router.get('/add-book', bookStoreController.addBook)

router.post('/add-book', bookStoreController.saveBook)

router.get('/edit-book/:bookId', bookStoreController.editBook)

router.post('/edit-book/', bookStoreController.editBookSave)

router.get('/favorites', bookStoreController.getFavorites)

router.post('/add-favorite', bookStoreController.addFavorite)

router.post('/delete-book', bookStoreController.deleteBook)

module.exports = router
