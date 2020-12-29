const Depot = require("../models/depot");

async function deleteDepot(id) {
	await Depot.deleteOne({ _id: id }).then((result) => {
		if (result.deleteCount < 1) {
			throw new Error("No depot with the provided id was found");
		}
	});
}

module.exports = { deleteDepot };
