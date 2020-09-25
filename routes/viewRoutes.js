const express = require('express');

const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(viewsController.alert);

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/forgotPassword', viewsController.getForgetPasswordForm);
router.get('/resetPassword/:resetToken', viewsController.getResetPasswordForm);
router.get(
	'/my-tours',
	// bookingController.createBookingCheckout,
	authController.protect,
	viewsController.getMyTours
);

router.post(
	'/submit-user-data',
	authController.protect,
	viewsController.updateUserData
);

module.exports = router;
