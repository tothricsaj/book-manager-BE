const path = require('path')

const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const gqlSchema = require('./graphql/schema');
const gqlResolver = require('./graphql/resolvers');
const bodyParser = require('body-parser')

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

const storeRoutes = require('./routes/bookStore')

app.use('/graphql', graphqlHTTP({
  schema: gqlSchema,
  rootValue: gqlResolver,
  graphiql: true,
}));

app.use(storeRoutes)

app.listen(3005);