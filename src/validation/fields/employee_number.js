const yup = require("yup");

module.exports = yup.string().length(6, "Employee Numbers are 6 digits long");
