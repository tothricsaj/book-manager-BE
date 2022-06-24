const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Hello {
    hello: String
  }

	type Root {
		hello: Hello
	}

	schema {
		query: Root
	}
`);