import { object, string, ref } from "yup";

export default object({
	password: string().required("Enter a new password"),
	confirm_password: string()
		.required("You must confirm your new password")
		.oneOf([ref("password"), null], "Passwords must match"),
});
