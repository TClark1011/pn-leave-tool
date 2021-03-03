import { screen } from "@testing-library/react";
import { getTestFn } from "../../utils/testUtils";
import HelpScreen from "./HelpScreen";

const helpScreenTest = getTestFn(HelpScreen);

describe("Basic Behaviour", () => {
	test(
		"Headers render",
		helpScreenTest(() => {
			expect(screen.getByText("Help")).toBeInTheDocument();
			expect(screen.getByText("FAQ")).toBeInTheDocument();
		}),
	);

	test(
		"Document title",
		helpScreenTest(() => {
			expect(document.title).toMatch(/^Help/);
		}),
	);
});
