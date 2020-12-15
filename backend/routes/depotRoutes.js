const express = require("express");
const Depot = require("../models/depot");
const authRoute = require("../routes/authRoute");

const depotRouter = express.Router();

depotRouter.get("/", async (request, response) => {
	response.status(200).json(await Depot.find({}));
});

depotRouter.use("/", authRoute);

depotRouter.post("/", async (request, response) => {
	console.log("Received request to add a new depot");
	try {
		const newDepotDocument = await new Depot(request.body);
		await newDepotDocument.save();
		response.status(200).json(newDepotDocument);
	} catch (error) {
		response
			.status(500)
			.json({ error: "There was an error", errorData: error });
	}
});

module.exports = depotRouter;
