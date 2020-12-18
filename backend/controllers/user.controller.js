const { Mongoose } = require("mongoose");
const UserModel = require("../models/user");

async function update({ _id, ...data }, response) {
	try {
		await UserModel.updateOne({ _id }, data);
		const updatedUser = await UserModel.findOne({
			_id,
		});
		// if (!updatedUser) {
		// 	throw new Error("User not found");
		// }
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

module.exports = { update };
