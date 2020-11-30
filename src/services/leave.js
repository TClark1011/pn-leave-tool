import axios from "../utils/axiosInstance";
// import axios from "axios";

export const submitLeave = (data) => axios.post("/api/leave/request", data);
