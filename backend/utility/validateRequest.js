/**
 *
 * @param {Object} request - The received HTTP request
 * @param {Object} options - Options detailing how to validate the request
 * @param {string[]} options.expectedFields - The fields expected to be found in the request body
 * @returns {Validation} An object containing information about the result of the validation
 */
function validateRequest(request, options) {
	if (options.expectedFields) {
		const expectedFields = options.expectedFields;
		const missingFields = [];
		for (const field of expectedFields) {
			if (!(field in request.body)) {
				missingFields.push(field);
			}
		}
		if (missingFields.length > 0) {
			return {
				valid: false,
				reason: "missing field(s)",
				details: missingFields,
			};
		}
	}
	return { valid: true, reason: null, details: null };
}

/**
 * @typedef {Object} Validation An object structure with information about the result of attempted request validation
 * @property {boolean} valid - The success status of the validation attempt
 * @property {string} reason - Short 2-3 word summary of why a request was found to be invalid, null otherwise
 * @property {*} details - More detailed information about why a request was found t obe invalid, null otherwise
 */

module.exports = validateRequest;
