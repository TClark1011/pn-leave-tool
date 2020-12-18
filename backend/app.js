require("dotenv").config();
const express = require("express");

//# Request routes are handled in external files
const userRouter = require("./routes/userRoutes");
const leaveRouter = require("./routes/leaveRoutes");
const authRouter = require("./routes/authRoute");
const depotRouter = require("./routes/depotRoutes");

const app = express();
app.use(express.json());

app.use("/api/depots", depotRouter);
app.use("/api/users", userRouter);
app.use("/api", authRouter);
app.use("/api/leave", leaveRouter);

/**
 * Catch all get request route
 */
app.get("/*", (request, response) => {
	//# Returns any non-api routed request to the root.
	//# All navigation is done via dom-routing, so this should only be triggered when a user first navigates to the application or when they refresh their browser
	response.status(404).redirect("/");
});

/**
 * Catch all non-get request route
 */
app.all("/api/*", (request, response) => {
	//# Catch all if a request is not handled by any other route
	//# It is important for this to come last so that it only catches requests that are not handled by any other route.
	response.status(404).json({ error: "invalid api call (bad address)" });
});

app.use(express.static("build"));

module.exports = app;
