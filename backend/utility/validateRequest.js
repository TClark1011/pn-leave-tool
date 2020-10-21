function validateRequest(request, options) {
	//#Check missing fields
	if (options.expectedFields) {
		const expectedFields = options.expectedFields;
		const missingFields = [];
		for (const field of expectedFields) {
			if (!(field in request.body)) {
				missingFields.push(field);
			}
		}
		if (missingFields.length > 0) {
			return { valid: false, reason: "missing fields", details: missingFields };
		}
	}
	return { valid: true };
}

module.exports = validateRequest;
