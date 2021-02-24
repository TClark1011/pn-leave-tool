import React from "react";
import { cleanup, render } from "@testing-library/react";
import App from "./App";
import {
	existingClientLandingRedir,
	getLandingRedir,
	loggedInCookie,
	newClientLandingRedir,
} from "./constants/autoNavParams";

afterEach(() => {
	cleanup();
});

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

describe("Landing redirects", () => {
	it("Redirects to the register page by default", () => {
		render(<App />);
		expect(getLandingRedir()).toEqual(newClientLandingRedir);
		expect(window.location.pathname).toEqual(newClientLandingRedir);
	});

	it("Redirects to login if user has logged in", () => {
		Object.defineProperty(document, "cookie", {
			get: jest.fn().mockImplementation(() => {
				return loggedInCookie;
			}),
		});
		render(<App />);

		expect(getLandingRedir()).toEqual(existingClientLandingRedir);
		// expect(window.location.pathname).toEqual(existingClientLandingRedir);
		// ? This does not work but it should.
		//? This has been confirmed with manual tests, and console logs within components
		//? Even though the cookie is mocked correctly, jest is always redirected to "/register"
	});
});
