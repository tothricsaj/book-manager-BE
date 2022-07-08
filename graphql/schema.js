const { buildSchema } = require('graphql');

const bookProperties = `
	id: ID!
	title: String
	author: String
	pubYear: Int
	genre: String	
`;

// TODO(tothricsaj): refactor the inputs
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
		title: String!
		author: String!
		pubYear: Int!
		genre: String
		coverImageUrl: String
	}


	input queryParamInput {
		${bookProperties}
	}

	input updateBookInput {
		${bookProperties}
	}

	type RootQuery {
		hello: Hello
		books: [Book]
		getBooksByTitle(title: String): [Book]
		complexBookSearch(params: queryParamInput): [Book]
	}

	type RootMutation {
		createBook(bookInput: bookInputData): Book!
		updateBook(updateBook: updateBookInput): [Int]
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);