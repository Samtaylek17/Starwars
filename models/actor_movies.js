const { Sequelize } = require('sequelize');
const db = require('../config/database');
const People = require('./characters');
const Film = require('./films');

const ActorMovie = db.define(
	'actor_movie',
	{
		PeopleId: {
			type: Sequelize.INTEGER,
			references: {
				model: People,
				key: 'PeopleId',
			},
		},
		filmId: {
			type: Sequelize.INTEGER,
			references: {
				model: Film,
				key: 'filmId',
			},
		},
	},
	{
		timestamps: true,
		freezeTableName: true,
	}
);

// People.belongsToMany(Film, { as: 'People', foreignKey: 'peopleId', through: 'ActorMovie' });
// Film.belongsToMany(People, { foreignKey: 'filmId', through: 'ActorMovie' });

module.exports = ActorMovie;
