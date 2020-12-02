import axios from "../utils/axiosInstance";

export const submitLmsData = (data, operator_access_key) =>
	axios.post("/api/leave/lmsData", data, { headers: { operator_access_key } });
