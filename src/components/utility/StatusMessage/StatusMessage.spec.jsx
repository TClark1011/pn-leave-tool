import React from "react";

import StatusMessage from "./StatusMessage";
import { screen } from "@testing-library/react";
import { customRender } from "../../../utils/testUtils";

const testMessage = "This is a test message";

const getRootEl = () => screen.findByTestId("StatusMessage__Root");

const renderTest = (props = {}) =>
	customRender(<StatusMessage {...props}>{testMessage}</StatusMessage>);

describe("Basic Rendering", () => {
	it("Renders", async () => {
		renderTest();
		const rootEl = await getRootEl();
		expect(rootEl).toBeTruthy();
	});

	it("Contains child string", async () => {
		renderTest();
		const rootEl = await getRootEl();
		expect(rootEl.textContent.includes(testMessage)).toBeTruthy();
	});
});
describe("Tones", () => {
	for (const tone of ["positive", "negative", "neutral"]) {
		it(`Renders ${tone} Message correctly`, async () => {
			renderTest({ tone });
			const rootEl = await getRootEl();
			expect(rootEl).toBeTruthy();
		});
	}
});
