import axios from "../utils/axiosInstance";

export const submitLeave = (data) => axios.post("/api/leave/request", data);

export const getLeave = (employee_number) =>
	axios.get(`/api/leave/view/?user=${employee_number}`);
