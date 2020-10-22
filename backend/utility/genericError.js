/**
 * Generates a generic error message to return to the frontend
 * @param {string} action - The activity that was being attempted when the error ocurred (in past-tense verb form)
 * @returns {string} A generated string to return to frontend as an error message
 */
function genericError(action) {
	return `An error occurred while attempting to ${action}. Please restart the application or try again later.`;
}

module.exports = genericError;
