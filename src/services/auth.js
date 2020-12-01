import axios from "../utils/axiosInstance";

export const login = (data) => axios.post("/api/users/login", data);

export const register = (data) => axios.post("api/users/register", data);

export const resendVerification = (employee_number) =>
	axios.post(`api/users/resendVerification/${employee_number}`);
