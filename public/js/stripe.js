import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
	'pk_test_51HTW54Iiu59lTVrBodPvop5mEX5Ws8EoLOelHssy3Y2A9qwjTGkJWVqMRRI20aSQegKmGWPBpfnXGMBZHFkDQHrg00xFnfERCI'
);

export const bookTour = async (tourId) => {
	try {
		const session = await axios(
			`http://192.168.1.6:8080/api/v1/bookings/checkout-session/${tourId}`
		);
		console.log(session);

		await stripe.redirectToCheckout({
			sessionId: session.data.session.id,
		});
	} catch (err) {
		console.log(err);
		showAlert('error', err);
	}
};
