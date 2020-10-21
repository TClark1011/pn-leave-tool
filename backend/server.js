require("dotenv").config();
const express = require("express");

//# Request routes are handled in external files
const apiRouter = require("./routes/api");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use(apiRouter);

app.get("/api/*", (request, response) => {
	//# Catch all if a request is not handled by any other route
	//# It is important for this to come last so that it only catches requests that are not handled by any other route.
	response.status(404).json({ error: "invalid api call (bad address)" });
});

app.get("/*", (request, response) => {
	//# Returns any non-api routed request to the root.
	//# All navigation is done via dom-routing, so this should only be triggered when a user first navigates to the application or when they refresh their browser
	response.status(404).redirect("/");
});

app.use(express.static("build"));

const PORT = process.env.BACKEND_PORT || process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
