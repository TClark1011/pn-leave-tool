import axios from "../utils/axiosInstance";

export const submitLeave = (data) => axios.post("/api/leave/request", data);
