const path = require('path')

const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const gqlSchema = require('./graphql/schema');
const gqlResolver = require('./graphql/resolvers');
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
const User = require('./model/User')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then(user => {
//       req.user = user
//       next()
//     })
//     .catch(err => console.log(err))
// })

const storeRoutes = require('./routes/bookStore')

app.use('/graphql', graphqlHTTP({
  schema: gqlSchema,
  rootValue: gqlResolver,
  graphiql: true,
}));

app.use(storeRoutes)

app.listen(3005);

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result => {
//     return User.findByPk(1)
//   })
//   .then(user => {
//     if(!user) {
//       return User.create({ name: 'Ricsi', email: 'test@test.com'})
//     }
//     return Promise.resolve(user)
//   })
//   .then(result => {
//     // console.log(result)
//     app.listen(3005)
//   })
//   .catch(err => console.log(err))
