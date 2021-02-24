import { getTestFn, getTestIdShortcut } from "../../utils/testUtils";
import ResetPasswordForm from "./ResetPasswordForm";
import { screen } from "@testing-library/react";

const resetPasswordFormTest = getTestFn(ResetPasswordForm);

const searchByTestId = getTestIdShortcut("ResetPasswordForm", screen);

describe("All elements are rendered", () => {
	test(
		"Section header",
		resetPasswordFormTest(() => {
			expect(screen.getByText("Reset Password")).toBeInTheDocument();
			expect(screen.getByText("Enter your new password")).toBeInTheDocument();
		}),
	);

	test(
		"Form elements",
		resetPasswordFormTest(() => {
			for (const item of ["root", "password-field", "password-reset-field"]) {
				expect(searchByTestId(`form-${item}`)).toBeInTheDocument();
			}
			expect(screen.getByText("update password")).toBeInTheDocument();
		}),
	);
});
