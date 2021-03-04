import { screen } from "@testing-library/react";
import { getTestFn } from "../../utils/testUtils";
import FloatingButtons from "./";

const floatingButtonsTest = getTestFn(FloatingButtons);

describe("Elements Render", () => {
	test(
		"Buttons",
		floatingButtonsTest(() => {
			for (const label of ["help", "profile"]) {
				const el = screen.getByLabelText(label);
				expect(el).toBeInTheDocument();
				expect(el).toHaveAttribute("href", `/${label}`);
			}
		}),
	);
});
