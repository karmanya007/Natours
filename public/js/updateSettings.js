import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
	try {
		const url =
			type === 'password'
				? 'http://192.168.1.5:8080/api/v1/users/updateMyPassword'
				: 'http://192.168.1.5:8080/api/v1/users/updateMe';
		const res = await axios({
			method: 'PATCH',
			url,
			data,
		});

		if (res.data.status === 'success') {
			showAlert('success', `${type.toUpperCase()} updated successfully`);
		}
	} catch (err) {
		showAlert('error', err.response.data.message);
	}
};
