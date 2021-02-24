import { fireEvent, screen } from "@testing-library/react";
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

const searchForTestId = (label) => screen.queryByTestId(`Profile__${label}`);

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
				expect(searchForTestId(`edit-button-${type}`)).toBeInTheDocument();
			}
		}),
	);

	test(
		"save/cancel buttons hidden",
		profileTest(() => {
			for (const type of ["cancel", "save"]) {
				expect(searchForTestId(`edit-${type}-button`)).not.toBeInTheDocument();
			}
		}),
	);

	test(
		"Return button",
		profileTest(() => {
			expect(searchForTestId("return-button")).toBeInTheDocument();
		}),
	);
});

describe("Edit mode toggle", () => {
	test(
		"Mode-specific buttons toggle correctly",
		profileTest(() => {
			const editTextButton = searchForTestId("edit-button-text");
			fireEvent.click(editTextButton, new MouseEvent("click"));

			expect(editTextButton).not.toBeInTheDocument();
			for (const type of ["cancel", "save"]) {
				expect(searchForTestId(`edit-${type}-button`)).toBeInTheDocument();
			}
		}),
	);
});
