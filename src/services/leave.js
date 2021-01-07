import axios from "../utils/axiosInstance";

export const submitLeave = (data) => axios.post("/leave/request", data);

export const getLeave = (employee_number) =>
	axios.get(`/leave/view/?user=${employee_number}`);
