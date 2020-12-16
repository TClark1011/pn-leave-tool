const yup = require("yup");

module.exports = yup.object({
	file: yup
		.array()
		.of(
			yup.object({
				Name: yup.string().required(),
			})
		)
		.required("Please upload a file"),
	accessKey: yup.string().required("Please enter an access key"),
	depot: yup.string().required("Please select a depot"),
});
