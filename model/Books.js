const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  pubYear: Sequelize.INTEGER,
  genre: {
    type: Sequelize.STRING,
    defaultValue: "Uncategorized"
  },
  coverImageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://archive.org/download/book_PNG2111/book_PNG2111.png"
  }
})

module.exports = Book