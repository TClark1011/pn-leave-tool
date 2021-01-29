import React from "react";

import StatusMessage from "./StatusMessage";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../__Test__/resources/renderFunctions";

const testMessage = "This is a test message";

const getRootEl = () => screen.findByTestId("StatusMessage__Root");

describe("Basic Rendering", () => {
	it("Renders", async () => {
		renderWithTheme(<StatusMessage>{testMessage}</StatusMessage>);
		const rootEl = await getRootEl();
		expect(rootEl).toBeTruthy();
	});

	it("Contains child string", async () => {
		renderWithTheme(<StatusMessage>{testMessage}</StatusMessage>);
		const rootEl = await getRootEl();
		expect(rootEl.textContent.includes(testMessage)).toBeTruthy();
	});
});
describe("Tones", () => {
	for (const tone of ["positive", "negative", "neutral"]) {
		it(`Renders ${tone} Message correctly`, async () => {
			renderWithTheme(<StatusMessage tone={tone}>{testMessage}</StatusMessage>);
			const rootEl = await getRootEl();
			expect(rootEl).toBeTruthy();
		});
	}
});
