import axios from "axios";

export const login = async (data) => {
	return axios.post("/api/users/login", data);
};
