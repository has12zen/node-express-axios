const express = require('express');
const axios = require('axios');
const app = express();
// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));

// Test middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	// console.log(req.headers);
	next();
});
//TODO:
app.use('/', async (req, res) => {});
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;
