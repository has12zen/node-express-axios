const express = require('express');
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
app.use('/', async (req, res) => {
	videoUrlLink.twitter.getInfo(req.query.url, {}, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log(info.full_text);
			console.log(info.variants);
			res.status(200).json({
				status: 'success',
				data: info,
			});
		}
	});
});
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;
