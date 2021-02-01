import axios from "../utils/axiosInstance";

/**
 * Fetch depots
 */
export const getDepots = () =>
	axios.get("/depots").then((result) => result.data);
