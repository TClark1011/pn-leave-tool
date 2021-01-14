import axios from "../utils/axiosInstance";

const rootUrl = "/users";

export const updateUser = (data) => axios.put(rootUrl + "/update", data);

export const forgotPassword = (employee_number) =>
	axios.post(rootUrl + "/forgotPassword/" + employee_number);
