require("dotenv").config();
const express = require("express");

//# Request routes are handled in external files
// const apiRouter = require("./routes/api");
const userRouter = require("./routes/userRoutes");
const leaveRouter = require("./routes/leaveRoutes");

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/leave", leaveRouter);
// app.use(apiRouter);

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

module.exports = app;
