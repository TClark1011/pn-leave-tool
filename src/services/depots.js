import axios from "../utils/axiosInstance";

export const getDepots = () =>
	axios.get("/depots").then((result) => result.data);
