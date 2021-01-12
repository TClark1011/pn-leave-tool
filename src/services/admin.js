import axios from "../utils/axiosInstance";

export const submitLmsData = (data, operator_access_key) =>
	axios.post(
		"/leave/lmsData",
		{ depot: data.depot, data: data.data },
		{ headers: { operator_access_key } },
	);
