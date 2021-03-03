import { screen } from "@testing-library/react";
import { getTestFn } from "../../utils/testUtils";
import ForgotPasswordForm from "./ForgotPasswordForm";

const forgotPasswordFormTest = getTestFn(ForgotPasswordForm);

const searchForTestId = (label) =>
	screen.queryByTestId(`ForgotPasswordForm__${label}`);

describe("Elements Render", () => {
	test(
		"Section title",
		forgotPasswordFormTest(() => {
			expect(screen.getByText("Forgot Password")).toBeInTheDocument();
		}),
	);
	test(
		"Help text",
		forgotPasswordFormTest(() => {
			expect(searchForTestId("help-text")).toBeInTheDocument();
		}),
	);
	test(
		"Form elements",
		forgotPasswordFormTest(() => {
			expect(searchForTestId("employee-number-field")).toBeInTheDocument();
			expect(searchForTestId("submit-button")).toBeInTheDocument();
		}),
	);
	test(
		"Status message (is not initially visible)",
		forgotPasswordFormTest(() => {
			expect(searchForTestId("status-message")).toBeNull();
		}),
	);
});
