import { screen } from "@testing-library/react";
import { getTestFn } from "../../utils/testUtils";
import HelpScreen from "./HelpScreen";

const helpScreenTest = getTestFn(HelpScreen);

describe("Elements Render", () => {
	test(
		"Section Title",
		helpScreenTest(() => {
			expect(screen.getByText("Help")).toBeInTheDocument();
		}),
	);
});
