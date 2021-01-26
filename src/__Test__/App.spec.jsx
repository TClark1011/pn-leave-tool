import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("Root element rendering", () => {
	it("Renders the root element", () => {
		render(<App />);
		const rootEl = document.getElementById("App");
		expect(rootEl).toBeTruthy();
	});
	it("Renders the content element", () => {
		render(<App />);
		const rootEl = document.getElementById("Content");
		expect(rootEl).toBeTruthy();
	});
});
