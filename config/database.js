const { Sequelize } = require('sequelize');
module.exports = new Sequelize('starwars', 'postgres', 'Samtaylek99.', {
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});
