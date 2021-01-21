//# This file contains addresses used when automatically navigating the user eg; landing page redirect

/**
 * Where to redirect user after they log in
 */
export const loginRedir = "/request";

/**
 * Where to redirect the user from the landing page
 *
 * Redirect user to login if they have ever signed in before, otherwise redirect them to registration
 */
export const landingRedir = localStorage.getItem("userHasLoggedInPreviously")
	? "/login"
	: "/register";
