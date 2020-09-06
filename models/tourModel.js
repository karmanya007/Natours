const mongoose = require('mongoose');

// Mongoose Schema
const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, ' A tour must have a name'],
		unique: true,
		trim: true,
	},
	duration: {
		type: Number,
		required: [true, 'A tour must have a duration'],
	},
	maxGroupSize: {
		type: Number,
		required: [true, 'A tour must have a duration'],
	},
	difficulty: {
		type: String,
		required: [true, 'A tour must have a difficulty'],
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
	},
	price: {
		type: Number,
		required: [true, ' A tour must have a price'],
	},
	priceDiscount: Number,
	summary: {
		type: String,
		trim: true,
		required: [true, 'A tour must have a summary'],
	},
	description: {
		type: String,
		trim: true,
	},
	imageCover: {
		type: String,
		required: [true, 'A tour must have a cover image'],
	},
	images: [String],
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	startDates: [Date],
});

// Mongoose model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
