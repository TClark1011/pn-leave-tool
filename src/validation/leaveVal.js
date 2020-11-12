const yup = require("yup");

const user = require("./fields/employee_number");

const addWeeks = require("date-fns/addWeeks");
const startOfToday = require("date-fns/startOfToday");

module.exports = yup.object({
	user,
	dates: yup.object({
		start: yup.date().required().min(addWeeks(startOfToday(), 2)),
		end: yup
			.date()
			.required()
			.test(
				"ahead of start",
				"end date must be later than start date",
				function (value) {
					return new Date(value) > new Date(this.resolve(yup.ref("start")));
				}
			),
	}),
});
