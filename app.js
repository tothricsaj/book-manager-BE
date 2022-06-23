const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
// const morgan = require('morgan') // due to logging requestes
const sequelize = require('./util/database')
const User = require('./model/User')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(morgan('combined'))

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

const storeRoutes = require('./routes/bookStore')

app.use(storeRoutes)

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    if(!user) {
      return User.create({ name: 'Ricsi', email: 'test@test.com'})
    }
    return Promise.resolve(user)
  })
  .then(result => {
    // console.log(result)
    app.listen(3005)
  })
  .catch(err => console.log(err))
