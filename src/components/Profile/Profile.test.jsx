import { screen } from "@testing-library/react";
import React from "react";
import userFixture from "../../fixtures/userFixture";

import { customRender } from "../../utils/testUtils";
import Profile from "./Profile";

const { name, depot, employee_number, email } = userFixture;

/**
 * Custom function for testing 'Profile'. Renders profile
 * component then runs passed callback. Passes value
 * returned from the render function to the callback.
 *
 * @param {Function} callback Test expectation code
 */
const profileTest = (callback) => () => {
	const container = customRender(<Profile />);
	callback(container);
};

const getTestId = (label) => `Profile__${label}`;
describe("All elements are rendered", () => {
	test(
		"Page title",
		profileTest(() => {
			expect(screen.getByText(name)).toBeInTheDocument();
		}),
	);

	test(
		"Fields",
		profileTest(() => {
			for (const fieldValue of [name, employee_number, email, depot._id]) {
				expect(screen.getByDisplayValue(fieldValue)).toBeInTheDocument();
			}
		}),
	);

	test(
		"Edit buttons",
		profileTest(() => {
			for (const type of ["text", "icon"]) {
				expect(
					screen.getByTestId(getTestId(`edit-button-${type}`)),
				).toBeInTheDocument();
			}
		}),
	);

	test(
		"Return button",
		profileTest(() => {
			expect(screen.getByTestId(getTestId("return-button")));
		}),
	);
});
