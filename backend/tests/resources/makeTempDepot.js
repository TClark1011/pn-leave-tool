const random = require("random");

//? Creates a hidden depot and returns its id,
//? Also returns function that will delete the depot when executed
module.exports = async (
	api,
	{ name = `Temp Depot - ${random.int(0, 100000)}`, drivers = 3, hidden = true }
) => {
	let tempDepotId;
	await api
		.post("/api/depots")
		.send({
			name,
			drivers,
			hidden,
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
