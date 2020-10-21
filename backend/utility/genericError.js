function genericError(action) {
	//# Generate a generic error message
	return `An error occurred while attempting to ${action}. Please restart the application or try again later.`;
}

module.exports = genericError;
