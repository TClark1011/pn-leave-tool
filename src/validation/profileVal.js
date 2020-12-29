const yup = require("yup");

function validation(depots) {
	return yup.object({
		name: yup.string().required("Name cannot be blank"),
		depot: yup.string().oneOf(
			depots.map((item) => item._id),
			`Selected depot is invalid`
		),
	});
}

module.exports = validation;
