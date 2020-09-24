const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Booking = require('./../models/bookingModel');
const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handleFactory');
const Email = require('./../utils/email');

exports.getCheckOutSession = catchAsync(async (req, res, next) => {
	const tour = await Tour.findById(req.params.tourId);

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		/* success_url: `${req.protocol}://${req.get('host')}/?tour=${
			req.params.tourId
		}&user=${req.user.id}&price=${tour.price}`, */
		success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
		cancel_url: `${req.protocol}://${req.get('host')}/${tour.slug}`,
		customer_email: req.user.email,
		client_reference_id: req.params.tourId,
		line_items: [
			{
				name: `${tour.name} Tour`,
				description: tour.summary,
				images: [
					`${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
				],
				amount: tour.price * 100,
				currency: 'usd',
				quantity: 1,
			},
		],
	});

	res.status(200).json({
		status: 'success',
		session,
	});
});

/* exports.createBookingCheckout = catchAsync(async (req, res, next) => {
	const { tour, user, price } = req.query;

	if (!tour && !user && !price) {
		return next();
	}
	await Booking.create({ tour, user, price });

	res.redirect(req.originalUrl.split('?')[0]);
}); */

const createBookingCheckout = catchAsync(async (session) => {
	const newUser = await User.findOne({
		email: session.data.object.customer_email,
	});
	const tour = session.data.object.client_reference_id;
	const user = newUser.id;
	const price = session.data.object.amount_total / 100;
	await Booking.create({ tour, user, price });

	const url = `https://natourify.herokuapp.com/me`;
	await new Email(newUser, url, session).sendInvoice();
});

exports.webhookCheckout = (req, res, next) => {
	const signature = req.headers['stripe-signature'];

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (err) {
		return res.status(400).send(`Webhook error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed') {
		createBookingCheckout(event);
	}

	res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
