const bcrypt = require("bcrypt");

/**
 * Authenticate user by comparing user provided password with stored password
 * @param {Object} storedUser - The user record taken from the database
 * @param {string} receivedPassword - The password provided by the user
 * @returns {boolean} Whether or not 'receivedPassword' matches (according to bcrypt) with the password field of 'storedUser'
 */
async function authenticateUser(storedUser, receivedPassword) {
	//# Returns true/false depending on if 'receivedPassword' matches the user's encrypted password
	return (await bcrypt.compare(receivedPassword, storedUser.password))
		? true
		: false;
}

module.exports = authenticateUser;
