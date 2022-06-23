const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize(
  'book-manager',
  'admin',
  'Admin1234$',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
)

module.exports = sequelize