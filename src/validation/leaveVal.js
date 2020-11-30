// import { startOfToday, addWeeks } from "date-fns";

const fixRequire = require("../utils/fixRequire");

const yup = require("yup");

const user = require("./fields/employee_number");

var addWeeks = fixRequire(require("date-fns/addWeeks"));
var startOfToday = fixRequire(require("date-fns/startOfToday"));

const schema = {
	user: user.required(),
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
};

module.exports = yup.object(schema);
