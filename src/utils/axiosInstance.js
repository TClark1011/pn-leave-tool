import axios from "axios";
import { backendDevPort, backendUrl } from "../constants/env";

/**
 * The axios instance used by the application
 */
export default axios.create({
	timeout: 15000,
	baseURL:
		process.env.NODE_ENV === "development"
			? `http://localhost:${backendDevPort}`
			: backendUrl,
	//? Set the baseURL according to the environment
});
