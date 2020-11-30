import axios from "../utils/axiosInstance";

export const tokenAdder = (user) => {
	axios.interceptors.request.use((request) => {
		//? Adds authentication headers to all requests made when a user is signed in
		if (user) {
			request.headers.authorisation = user.token;
		}
		return request;
	});
};

export const errorCatcher = () => {
	axios.interceptors.response.use(
		//? If an error response has a redirect key, redirect user to that page
		(response) => response,
		(error) => {
			if (error.response.data.redirect) {
				window.location = error.response.data.redirect;
				//* This is a shoddy way of redirecting, should find a way to do it properly with react router dom
			}
			return Promise.reject(error);
		}
	);
};
