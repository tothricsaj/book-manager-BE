const {Op} = require('sequelize');
const Book = require('../model/Books');

module.exports = {
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

		} catch(error) {
			throw new Error(error);
		}
		
	},

	complexBookSearch: async ({params}) => {
		try {
			const {id, title, author, pubYear, genre} = params;
			const queryObject = {
				...(id) ? {id: {[Op.substring]: id}} : null,
				...(title) ? {title: {[Op.substring]: title}} : null,
				...(author) ? {author: {[Op.substring]: author}} : null,
				...(pubYear) ? {pubYear: {[Op.eq]: pubYear}} : null,
				...(genre) ? {genre: {[Op.substring]: genre}} : null
			};

			const books = await Book.findAll({
				where: {
					[Op.and]: queryObject
				}
			})

			return books;

		} catch (error) {
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
	},

	updateBook: async ({updateBook}) => {
		const {id, title, author, pubYear, genre} = updateBook;
		const updateProperties = {
			...(title) ? {title: title}:null,
			...(author) ? {author: author}:null,
			...(pubYear) ? {pubYear: pubYear}:null,
			...(genre) ? {genre: genre}:null
		};

		const updatedBook = await Book.update(
			updateProperties,
			{
				where: {id: id}
			}
		);

		return updatedBook;
	}

} 