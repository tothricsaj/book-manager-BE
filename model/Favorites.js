const fs = require('fs')
const path = require('path')

const pathOfFavorites = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'favorites.json'
)

const pathOfBooks = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'books.json'
)

const getBooksFromFile = (fn, books=true) => {

  let resoucePath = books ? pathOfBooks : pathOfFavorites

  fs.readFile(resoucePath, (err, fileContent) => {
    if(err) {
      console.log(err)
      fn([])
    } else {
      fn(JSON.parse(fileContent))
    }
  })
}

module.exports = class Favorites {

  static saveFavorite(bookId) {
    getBooksFromFile(books => {
      const book = books.find(b => b.id === bookId)
      book.favorite = true
      fs. writeFile(pathOfBooks, JSON.stringify(books), err => {console.log(err)})
      getBooksFromFile(favorites => {
        favorites.push(book)
        fs. writeFile(pathOfFavorites, JSON.stringify(favorites), err => {console.log(err)})
      }, false)
    })
  }

  static fetchAllFavorites(fn) {
    getBooksFromFile(fn, false)
  }
}