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

//# Delete all temp depots
depotRouter.delete("/temp", async (request, response) => {
	console.log("Received request to delete temp depots");
	try {
		const result = await Depot.deleteMany({
			name: { $regex: "Temp Depot", $options: "i" },
		});
		response.status(200).json({ deleted: result.deletedCount });
		return console.log("All Temp depots have been successfully deleted");
	} catch (err) {
		response.status(500).json(err);
		return console.log("Request to delete all temp depots has failed: ", err);
	}
});

depotRouter.delete("/:id", async (request, response) => {
	const { id } = request.params;
	try {
		await deleteDepot(id);
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
