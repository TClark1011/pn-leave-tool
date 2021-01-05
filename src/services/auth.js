import axios from "../utils/axiosInstance";

const rootUrl = "/users";

export const login = (data) => axios.post(`${rootUrl}/login`, data);

export const register = (data) => axios.post(`${rootUrl}/register`, data);

export const resendVerification = (employee_number) =>
	axios.post(`${{ rootUrl }}/resendVerification/${employee_number}`);
