import axios from "../utils/axiosInstance";

export const updateUser = (data) => axios.put("/api/users/update", data);
