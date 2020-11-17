import axios from "axios";

export const login = async (data) => {
	return axios.post("/api/users/login", data);
};

export const register = async (data) => {
	try {
		return await axios.post("api/users/register", data);
	} catch (err) {
		return err;
	}
};
