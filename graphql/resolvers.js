const {Op} = require('sequelize');
const Book = require('../model/Books');

module.exports = {
	hello: () => {
			return 'Hello world!';
	},
	books: async () => {
		const books = await Book.findAll();
		return books.map(book => book['dataValues']);
	},
	getBooksByTitle: async ({title}) => {
		// console.log('title -> ', title);
		try {
			const books = await Book.findAll({
				where: {
					title: {
						[Op.eq]: title
					}
				}
			});

			console.log('books -> ', books);

			return books;

		} catch(e) {
			console.log(e);
		}
		
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