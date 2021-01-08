import axios from "axios";

export default axios.create({
	timeout: 15000,
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:4000"
			: "https://pn-leave-tool-backend.herokuapp.com/",
});
