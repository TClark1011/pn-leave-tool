const UserModel = require("../models/user");
const profileVal = require("../../src/validation/profileVal");
const DepotModel = require("../models/depot");

async function updateUser({ _id, ...data }, response) {
	try {
		await profileVal(await DepotModel.find({})).isValid(data);
		await UserModel.updateOne({ _id }, { name: data.name, depot: data.depot });
		const updatedUser = await UserModel.getFromEmployeeNumber(
			data.employee_number
		);
		if (!updatedUser) {
			throw new Error("User not found");
		}
		response.status(200).json(updatedUser);
		return console.log("request to update user data was successful");
	} catch (error) {
		response.status(500).json({ error });
		return console.log(
			"there was an error while trying to update user data: ",
			error
		);
	}
	//todo: limit fields that can be updated
}

module.exports = { updateUser };
