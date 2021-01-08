export default process.env.NODE_ENV === "production"
	? "https://pn-leave-tool-backend.herokuapp.com"
	: "http://localhost:4000";
