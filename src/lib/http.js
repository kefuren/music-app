import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use((config) => {
	return config;
})

axios.interceptors.response.use(response => {
	if (response.status === 200) {
		return response.data;
	}
	return Promise.reject(response);
})

export function httpGet(url) {
	return new Promise((resolve, reject) => {
		axios(url)
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}


export function httpPost(url, data) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(data))
			.then((res) => {
				// console.log('httpPost', res)
				if (res.data.code === 200) {
					resolve(res.data)
				} else {
					reject(res.data.message)
				}
			})
			.catch((err) => {
				reject(err)
			})
	})
}