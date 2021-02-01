import axios from "../utils/axiosInstance";

const rootUrl = "/users";

/**
 * Update user's profile
 *
 * @param {object} data Profile form data
 */
export const updateUser = (data) => axios.put(rootUrl + "/update", data);

/**
 * Send 'Forgot Password' request to start the password reset process
 *
 * @param {string} employee_number The user's employee number
 */
export const forgotPassword = (employee_number) =>
	axios.post(rootUrl + "/forgotPassword/" + employee_number);

/**
 * Send reset password request
 *
 * @param {object} data Reset Password form data
 * @param {string} resetKey unique resetKey provided by server
 */
export const resetPassword = (data, resetKey) =>
	axios.post(rootUrl + "/resetPassword/" + resetKey, data);
