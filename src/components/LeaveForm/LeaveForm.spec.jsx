import { getTestFn } from "../../utils/testUtils";
import LeaveForm, { leaveFormInstructions } from "./LeaveForm";
import { screen } from "@testing-library/react";

const leaveFormTest = getTestFn(LeaveForm);

describe("Elements render", () => {
	test(
		"Section Title",
		leaveFormTest(() => {
			expect(screen.getByText("Submit Leave Request")).toBeInTheDocument();
		}),
	);

	test(
		"Instructions",
		leaveFormTest(() => {
			expect(screen.getByText(leaveFormInstructions)).toBeInTheDocument();
		}),
	);

	test(
		"Misc.",
		leaveFormTest(() => {
			expect(screen.getByText("To")).toBeInTheDocument();
			expect(screen.getByText("Your leave is")).toBeInTheDocument();
			expect(screen.getByText("days long")).toBeInTheDocument();
		}),
	);
});
