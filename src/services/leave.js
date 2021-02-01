import axios from "../utils/axiosInstance";

/**
 * Submit leave request
 *
 * @param {object} data Leave Request form data
 */
export const submitLeave = (data) => axios.post("/leave/request", data);

/**
 * Fetch user's leave
 *
 * @param {string} employee_number The user's employee number
 */
export const getLeave = (employee_number) =>
	axios.get(`/leave/view/?user=${employee_number}`);
