require("dotenv").config();

module.exports = {
	employee_number: `${process.env.TEST_USER_EMP_NUM}`,
	password: `${process.env.TEST_USER_PASS}`,
};
