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

	input bookInputData {
		title: String
		author: String
		pubYear: Int
		genre: String
		coverImageUrl: String
	}

	type RootQuery {
		hello: Hello
		books: [Book]
	}

	type RootMutation {
		createBook(bookInput: bookInputData): Book!
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);