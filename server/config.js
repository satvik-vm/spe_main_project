import dotenv from "dotenv";

dotenv.config();

export const config = {
	production: {
		dbUrl: process.env.PROD_DB_URL,
		// PORT: process.env.PROD_PORT,
	},
	test: {
		dbUrl: process.env.TEST_DB_URL,
		// PORT: process.env.TEST_PORT,
	},
};

// module.exports = config;