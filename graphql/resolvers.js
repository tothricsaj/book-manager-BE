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
		try {
			const books = await Book.findAll({
				where: {
					title: {
						[Op.eq]: title
					}
				}
			});

			return books;

		} catch(e) {
			console.log(e);
		}
		
	},
	complexBookSearch: async ({params}) => {
		try {
			const {title, author, pubYear, genre} = params;
			const queryObject = {
				...(title) ? {title: {[Op.substring]: title}} : null,
				...(author) ? {author: {[Op.substring]: author}} : null,
				...(pubYear) ? {pubYear: {[Op.eq]: pubYear}} : null,
				...(genre) ? {genre: {[Op.substring]: genre}} : null
			};

			console.log('params -> ', params);

			console.log('queryObject -> ', queryObject);
			const books = await Book.findAll({
				where: {
					[Op.and]: queryObject
				}
			})

			return books;

		} catch (error) {
			console.log(error);
			throw new  Error(error);
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