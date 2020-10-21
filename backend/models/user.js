const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const url = process.env.MONGO_URI;
console.log(`connecting to ${url}`);
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting too MongoDB: ", error.message);
	});

//TODO: Extra fields
const userSchema = {
	employee_number: { type: Number, required: true },
	password: { type: String, required: true },
	date_created: { type: Date, default: Date.now() },
};

const User = mongoose.model("User", userSchema);

User.getFromEmployeeNumber = async function (employee_number) {
	return await User.findOne({ employee_number });
};

module.exports = User;
