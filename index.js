const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const compression = require('compression');
const { config } = require('./config');
const db = require('./config/database');
const globalErrorHandler = require('./middlewares/errors');
const filmsRouter = require('./routes/films');
const peopleRouter = require('./routes/people');

async function connection() {
	try {
		await db.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

connection();

const app = express();

app.enable('trust proxy');

/**
 * @description Implement Cors
 */
app.use(cors());

app.patch('*', cors());
app.options('*', cors());

/**
 * @description Set security HTTP headers
 */
app.use(helmet());

/**
 * @description Development logging
 */
if (config.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

/**
 * @description Body Parser, reading data from body into req.body
 */
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

/**
 * @description Data Sanitization against XSS
 */
app.use(xss());

app.use(compression());

app.use('/api/films', filmsRouter);
app.use('/api/people', peopleRouter);

app.use(globalErrorHandler);

const port = config.PORT;

const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! Shutting down...');
	console.log(err, err.name, err.message);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! Shutting down...');
	server.close(() => {
		process.exit(1);
	});
});

process.on('SIGTERM', () => {
	console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
	server.close(() => {
		console.log('🔥 Process terminated!');
	});
});
