const Book = require('../model/Books')
const User = require('../model/User')
const Favorites = require('../model/Favorites')

// TODO(tothricsaj): give the renderPage method to all render method

const renderPage = (fn, path, params) => {
  User.findByPk(1)
    .then(user => {
      paramsWithUser = {...params, user: user.name}
      fn.render(path, paramsWithUser)
    })
    .catch(err => console.log(err))

}

exports.homePage = (req, res, next) => {
  const self = this
  Book.findAll()
    .then(books => {
      renderPage(res, 'home', {
        books,
        path: '/'
      })
    })
    .catch(err => console.log(err))
}

exports.addBook = (req, res, next) => {
  res.render('addBook', {
    book: null
  })
}

exports.editBook = (req, res, next) => {
  const bookId = req.params.bookId
  Books.findById(bookId, book => {
    res.render('addBook', {
      book: book
    })
  })
}

exports.editBookSave = (req, res, next) => {
  const bookId         =  req.body.bookId
  const author         =  req.body.author
  const title          =  req.body.title
  const pubYear        =  req.body.pubYear
  const coverImageURL  =  req.body.coverImageURL

  // console.log(title, ' in controller')

  Books.changeOne(
    bookId,
    author,
    title,
    pubYear,
    coverImageURL,
    () => {res.redirect('/')}
  )
}

exports.saveBook = (req, res, next) => {

  console.log(req.body)

  const author         =  req.body.author
  const title          =  req.body.title
  const pubYear        =  req.body.pubYear
  const coverImageURL  =  req.body.coverImageURL

  Book.create({
    author: author,
    title: title,
    pubYear: pubYear,
    coverImageURL: coverImageURL
  })
  .then(result => {
    res.redirect('/')
  })
  .catch(err => console.log(err))
}

exports.getFavorites = (req, res, next) => {
  Favorites.fetchAllFavorites(favorites => {
    res.render('favorites', {
      favorites: favorites
    })
  })
}

exports.addFavorite = (req, res, next) => {
  const bookId = req.body.bookId
  Favorites.saveFavorite(bookId)
  res.redirect('/')
}

exports.deleteBook = (req, res, next) => {
  const bookId = req.body.bookId

  Book.findByPk(bookId)
    .then(book => book.destroy())
    .then(result => {
      console.log('Book is deleted!')
      res.redirect('/')
    })
    .catch(err => console.log(err))
}