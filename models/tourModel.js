const mongoose = require('mongoose');
const slugify = require('slugify');

// Mongoose Schema
const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, ' A tour must have a name'],
			unique: true,
			trim: true,
			maxlength: [40, 'A tour name must have less or equal than 40 characters'],
			minlength: [
				10,
				'A tour name must have greater or equal than 10 characters',
			],
			// validate: [validator.isAlpha, 'A tour name must only contain characters'],
		},
		slug: String,
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
			enum: {
				values: ['easy', 'medium', 'difficult'],
				message: 'Difficulty must be either: easy, medium or difficult',
			},
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, 'Rating must be above 1.0'],
			max: [5, 'Rating must be below 5.0'],
		},
		price: {
			type: Number,
			required: [true, ' A tour must have a price'],
		},
		priceDiscount: {
			type: Number,
			validate: {
				validator: function (val) {
					// Works only on new documents
					return val < this.price;
				},
				message: 'Discount price ({VALUE}) should be below regular price',
			},
		},
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
		secretTour: {
			type: Boolean,
			default: false,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
// Virtual Property
tourSchema.virtual('durationWeeks').get(function () {
	return this.duration / 7;
});

// DOCUMENT Middleware
tourSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// Query Middleware
tourSchema.pre(/^find/, function (next) {
	this.find({ secretTour: { $ne: true } });
	this.start = Date.now();
	next();
});
tourSchema.post(/^find/, function (docs, next) {
	console.log(`Query took ${Date.now() - this.start} ms`);
	next();
});

// Agregation Middleware
tourSchema.pre('aggregate', function (next) {
	this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
	next();
});

// Mongoose model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
