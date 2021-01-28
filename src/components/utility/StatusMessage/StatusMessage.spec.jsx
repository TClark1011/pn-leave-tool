import React from "react";

import StatusMessage from "./StatusMessage";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../__Test__/resources/renderFunctions";

const testMessage = "This is a test message";

describe("Tones", () => {
	for (const tone of ["positive", "negative", "neutral"]) {
		it(`Renders ${tone} Message correctly`, async () => {
			renderWithTheme(<StatusMessage tone={tone}>{testMessage}</StatusMessage>);
			expect(await screen.findByTestId("StatusMessage__Root")).toBeTruthy();
		});
	}
});
