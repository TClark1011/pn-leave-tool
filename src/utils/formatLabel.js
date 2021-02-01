//#Formats a code label like "employee_number" or "employeeNumber" into the format "Employee Number"

/**
 * Formats a string to match the format used in Field Labels
 *
 * @param {string} string The string to be formatted
 * @returns {string} The passed string formatted in title case
 */
export default (string) => {
	string = string.substr(0, 1).toUpperCase() + string.substr(1);
	string = string.replace(/_/g, " ");
	var lastCharCap = false;
	for (let i = 1; i < string.length; i++) {
		if (string.charAt(i - 1) === " ") {
			string =
				string.substr(0, i) +
				string.charAt(i).toUpperCase() +
				string.substr(i + 1);
		}
		const char = string.charAt(i);
		if (
			/[a-zA-Z]/.test(char) &&
			char.charCodeAt(0) === char.toUpperCase().charCodeAt(0)
		) {
			if (!lastCharCap) {
				lastCharCap = true;
				string = string.substr(0, i) + " " + string.substr(i);
			}
		} else {
			lastCharCap = false;
		}
	}
	return string;
};
