/**
 * This file exports the environment variables used in the app.
 * This allows for nicer syntax and for jest to mock env variables.
 */

import toBoolean from "to-boolean";

export const backendDevPort = process.env.REACT_APP_BACKEND_DEV_PORT;
//? The port used by the backend during development

export const backendUrl = process.env.REACT_APP_BACKEND_URL;
//? The backend url, only used in production.

export const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL;
//? The support email address

export const validateEmail =
	!process.env.REACT_APP_VALIDATE_EMAIL ||
	toBoolean(process.env.REACT_APP_VALIDATE_EMAIL);
