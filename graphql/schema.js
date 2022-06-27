const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Hello {
    hello: String
  }

	type Book {
		id: ID!
		title: String
		author: String
		pubYear: Int
		genre: String
		converImage: String
	}

	type Root {
		hello: Hello
		books: [Book]
	}

	schema {
		query: Root
	}
`);