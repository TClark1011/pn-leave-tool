const random = require("random");

//? Creates a hidden depot and returns its id,
//? Also returns function that will delete the depot when executed
module.exports = async (
	api,
	depotName = `Temp Depot - ${random.int(0, 100000)}`,
	depotDrivers = 3,
	depotHidden = true
) => {
	let tempDepotId;
	await api
		.post("/api/depots")
		.send({
			name: depotName,
			drivers: depotDrivers,
			hidden: depotHidden,
		})
		.set("operator_access_key", process.env.OPERATOR_ACCESS_KEY)
		.then((response) => {
			tempDepotId = response.body._id;
		});
	return {
		id: tempDepotId,
		delete: async () => {
			return await api
				.delete(`/api/depots/${tempDepotId}`)
				.set("operator_access_key", process.env.OPERATOR_ACCESS_KEY)
				.expect(200);
		},
	};
};
