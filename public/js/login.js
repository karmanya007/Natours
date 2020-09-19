import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
	try {
		const res = await axios({
			method: 'post',
			url: `http://192.168.1.5:8080/api/v1/users/login`,
			data: {
				email: email,
				password: password,
			},
		});

		if (res.data.status === 'success') {
			showAlert('success', 'Logged in successfully');
			window.setTimeout(() => {
				location.assign('/');
			}, 1500);
		}
	} catch (err) {
		showAlert('error', err.response.data.message);
	}
};

export const logout = async () => {
	try {
		const res = await axios({
			method: 'GET',
			url: 'http://192.168.1.5:8080/api/v1/users/logout',
		});

		if (res.data.status === 'success') location.reload(true);
	} catch (err) {
		showAlert('error', 'Error logging out! Try again!');
	}
};
