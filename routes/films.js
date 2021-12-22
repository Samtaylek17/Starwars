const express = require('express');
const { populateMovies, getFilms } = require('../controllers');

const router = express.Router();

router.get('/', getFilms);
router.post('/create', populateMovies);

module.exports = router;
