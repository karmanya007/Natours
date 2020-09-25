import '@babel/polyfill';
import { login, logout, signup, forgotPassword, resetPassword } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alert';

// DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const forgetPasswordForm = document.querySelector('.form--forget');
const resetPasswordForm = document.querySelector('.form--reset');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

if (mapBox) {
	const locations = JSON.parse(mapBox.dataset.locations);
	displayMap(locations);
}

if (loginForm) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		login(email, password);
	});
}
if (signupForm) {
	signupForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('password-confirm').value;
		signup(name, email, password, passwordConfirm);
	});
}
if (forgetPasswordForm) {
	forgetPasswordForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value;
		forgotPassword(email);
	});
}

if (logOutBtn) {
	logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
	userDataForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const form = new FormData();
		form.append('name', document.getElementById('name').value);
		form.append('email', document.getElementById('email').value);
		form.append('photo', document.getElementById('photo').files[0]);

		updateSettings(form, 'data');
	});
}
if (userPasswordForm) {
	userPasswordForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		document.querySelector('.btn--save-password').textContent = 'Updating...';
		const passwordCurrent = document.getElementById('password-current').value;
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('password-confirm').value;

		await updateSettings(
			{ passwordCurrent, password, passwordConfirm },
			'password'
		);
		document.querySelector('.btn--save-password').textContent = 'Save password';
		document.getElementById('password-current').value = '';
		document.getElementById('password').value = '';
		document.getElementById('password-confirm').value = '';
	});
}
if (resetPasswordForm) {
	resetPasswordForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('password-confirm').value;
		const resetToken = resetPasswordForm.dataset.resettoken;
		console.log(resetToken);
		resetPassword(password, passwordConfirm, resetToken);
	});
}

if (bookBtn) {
	bookBtn.addEventListener('click', (e) => {
		e.target.textContent = 'Processing...';
		const { tourId } = e.target.dataset;
		bookTour(tourId);
	});
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
