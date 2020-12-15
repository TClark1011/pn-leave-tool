import axios from "../utils/axiosInstance";

export const getDepots = () =>
	axios.get("/api/depots").then((result) => result.data);
