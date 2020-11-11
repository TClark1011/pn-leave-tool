const yup = require("yup");

const user = require("./fields/employee_number");

const addDays = require("date-fns/addDays");

module.exports = yup.object({
	user,
	dates: yup.object({
		start: yup.date().required().min(addDays(new Date(), 13)),
		end: yup.date().required(),
	}),
	//TODO: Make end's 'min' value work
});
