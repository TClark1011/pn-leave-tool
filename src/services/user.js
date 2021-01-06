import axios from "../utils/axiosInstance";

export const updateUser = (data) => axios.put("/users/update", data);
