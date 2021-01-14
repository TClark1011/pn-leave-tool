import { object, string } from "yup";

export default object({
	employee_number: string().required("Please enter your employee number"),
});
