const { Sequelize } = require('sequelize');
const db = require('../config/database');
// const People = require('./characters');

const Film = db.define(
	'Film',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.STRING,
		},
		episode_id: {
			type: Sequelize.INTEGER,
		},
		opening_crawl: {
			type: Sequelize.TEXT,
		},
		director: {
			type: Sequelize.STRING,
		},
		producer: {
			type: Sequelize.STRING,
		},
		release_date: {
			type: Sequelize.DATE,
		},
		characters: {
			type: Sequelize.ARRAY(Sequelize.STRING),
		},

		created: {
			type: Sequelize.DATE,
		},
		edited: {
			type: Sequelize.DATE,
		},
		url: {
			type: Sequelize.DATE,
		},
	},
	{
		timestamps: true,
		freezeTableName: true,
	}
);

const People = db.define(
	'People',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		height: {
			type: Sequelize.INTEGER,
		},
		mass: {
			type: Sequelize.INTEGER,
		},
		hair_color: {
			type: Sequelize.STRING,
		},
		skin_color: {
			type: Sequelize.STRING,
		},
		eye_color: {
			type: Sequelize.STRING,
		},
		birth_year: {
			type: Sequelize.STRING,
		},
		gender: {
			type: Sequelize.STRING,
		},
		homeworld: {
			type: Sequelize.STRING,
		},
		films: {
			type: Sequelize.ARRAY(Sequelize.STRING),
		},

		species: {
			type: Sequelize.STRING,
		},

		vehicles: {
			type: Sequelize.STRING,
		},

		starships: {
			type: Sequelize.STRING,
		},

		created: {
			type: Sequelize.DATE,
		},
		edited: {
			type: Sequelize.DATE,
		},
		url: {
			type: Sequelize.STRING,
		},
	},
	{
		timestamps: true,
		freezeTableName: true,
	}
);
Film.belongsToMany(People, { through: 'ActorMovies' });
People.belongsToMany(Film, { through: 'ActorMovies' });

db.sync({ alter: true }).then(() => {
	console.log('Table Created');
});

module.exports = { Film, People };
