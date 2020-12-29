const express = require("express");
const { deleteDepot } = require("../controllers/depot.controllers");
const Depot = require("../models/depot");
const authRoute = require("../routes/authRoute");

const depotRouter = express.Router();

depotRouter.get("/", async (request, response) => {
	console.log("Received request to fetch depot list");
	response.status(200).json(await Depot.find({}));
});

depotRouter.use("/", authRoute);

depotRouter.delete("/:id", (request, response) => {
	const { id } = request.params;
	try {
		deleteDepot(id);
		response.status(200).json();
		return console.log("Successfully deleted depot");
	} catch (err) {
		response.status(500).json(err);
		return console.log("(depotRoutes) failed to delete depot. Error: ", err);
	}
});

depotRouter.post("/", async (request, response) => {
	console.log("Received request to add a new depot");
	try {
		const newDepotDocument = await new Depot(request.body);
		await newDepotDocument.save();
		response.status(200).json(newDepotDocument);
		return console.log("Successfully returned depot list");
	} catch (error) {
		response
			.status(500)
			.json({ error: "There was an error", errorData: error });
	}
});

module.exports = depotRouter;
