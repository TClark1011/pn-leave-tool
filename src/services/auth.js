import axios from "../utils/axiosInstance";

const rootUrl = "/users";

/**
 * Send login request
 *
 * @param {object} data Login form data
 */
export const login = (data) => axios.post(`${rootUrl}/login`, data);

/**
 * Send registration request
 *
 * @param {object} data Registration form data
 */
export const register = (data) => axios.post(`${rootUrl}/register`, data);

/**
 * Send request to resend validation email during registration
 *
 * @param {string} employee_number The user's employee number
 */
export const resendVerification = (employee_number) =>
	axios.post(`${rootUrl}/resendVerification/${employee_number}`);
