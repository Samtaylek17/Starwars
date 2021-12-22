const axios = require('axios');
const APIFeatures = require('../middlewares/api_features');
const catchAsync = require('../middlewares/catch_async');
const AppError = require('../middlewares/app_error');
const { Film, People } = require('../models/films');
// const People = require('../models/characters');

/**
 * @description Fetch All Movies from the starwars api
 */

const populateMovies = catchAsync(async (req, res, next) => {
	try {
		const movies = await axios.get('https://swapi.dev/api/films');
		const results = movies.data.results;

		const films = [];

		const createFilm = async (film) => {
			const { title, episode_id, opening_crawl, director, producer, release_date, characters, created, edited, url } =
				film;

			const movie = {
				title,
				episode_id,
				opening_crawl,
				director,
				producer,
				release_date,
				characters,
				created,
				edited,
				url,
			};

			const newMovie = await Film.create(movie);

			films.push(newMovie.dataValues);

			return films;
		};

		for (let result of results) {
			await createFilm(result);
		}

		res.status(200).json({
			films,
		});
	} catch (err) {
		console.log(err);
	}
});

const populateCharacters = catchAsync(async (req, res, next) => {
	const people = await axios.get('https://swapi.dev/api/people');
	const results = people.data.results;

	const characters = [];

	const createCharacter = async (character) => {
		const {
			name,
			height,
			mass,
			hair_color,
			skin_color,
			eye_color,
			birth_year,
			gender,
			homeworld,
			films,
			created,
			edited,
			url,
		} = character;

		const actor = {
			name,
			height,
			mass,
			hair_color,
			skin_color,
			eye_color,
			birth_year,
			gender,
			homeworld,
			films,
			created,
			edited,
			url,
		};

		const newActor = await People.create(actor);

		characters.push(newActor.dataValues);

		return characters;
	};

	for (let result of results) {
		await createCharacter(result);
	}

	res.status(200).json({
		status: 'success',
		characters,
	});
});

const getFilms = catchAsync(async (req, res, next) => {
	try {
		const filter = {};

		const features = new APIFeatures(Film.findAll, req.query).filter().sort().limitFields().paginate();

		const films = await features.query;

		res.status(200).json({
			status: 'success',
			count: films.length,
			films,
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = { populateMovies, populateCharacters, getFilms };
