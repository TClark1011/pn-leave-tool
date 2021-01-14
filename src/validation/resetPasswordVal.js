import { object, ref } from "yup";
import password from "./fields/password";

export default object({
	password: password.required("Enter a new password"),
	confirm_password: password
		.required("You must confirm your new password")
		.oneOf([ref("password"), null], "Passwords must match"),
});
