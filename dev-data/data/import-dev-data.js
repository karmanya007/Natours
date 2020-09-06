const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const { dirname } = require('path');

dotenv.config({ path: './config.env' });

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
	.then((con) => console.log('DB connection successful.....'));

// READ Json file
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data in DB
const importData = async () => {
	try {
		await Tour.create(tours);
		console.log('Data sucessfully loaded into DB');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// Delete all data from DB
const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log('Data sucessfully deleted from DB');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}
