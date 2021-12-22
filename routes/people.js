const express = require('express');
const { populateCharacters } = require('../controllers');

const router = express.Router();

router.post('/create', populateCharacters);

module.exports = router;
