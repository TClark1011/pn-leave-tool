import axios from "../utils/axiosInstance";

/**
 * Submit CSV lms data
 *
 * @param {object} data The csv data from lms
 * @param {string} operator_access_key The operator access key
 */
export const submitLmsData = (data, operator_access_key) =>
	axios.post("/leave/lmsData", data, { headers: { operator_access_key } });
