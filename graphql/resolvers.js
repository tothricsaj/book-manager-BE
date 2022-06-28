const Book = require('../model/Books');

module.exports = {
	hello: () => {
			return 'Hello world!';
	},
	books: async () => {
		const books = await Book.findAll();
		return books.map(book => book['dataValues']);
	},
	createBook: async ({bookInput}) => {
		const addedBook = await Book.create({
			author: bookInput.author,
			title: bookInput.title,
			genre: bookInput.genre,
			pubYear: bookInput.pubYear,
			coverImageUrl: bookInput.coverImageUrl
		})

		return addedBook;
	}

} 