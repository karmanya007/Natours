const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// MongoDB
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then((con) => console.log('DB connection successful....'));

// Server
const port = process.env.PORT || 1337;

app.listen(port, '192.168.1.4', () => {
	console.log(`App running on port ${port}....`);
});
