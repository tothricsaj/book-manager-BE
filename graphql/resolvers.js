const Book = require('../model/Books');

module.exports = {
	hello: () => {
			return 'Hello world!';
	},
	books: async () => {
		const books = await Book.findAll();
		return books.map(book => book['dataValues']);
	}
} 