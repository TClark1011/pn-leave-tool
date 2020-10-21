const bcrypt = require("bcrypt");

/**
 * Encrypt a provided password
 * @param {string} password - password to be encrypted
 * @returns {string} - Provided raw password encrypted with bcrypt
 */
async function encryptPassword(password) {
	//# Returns encrypted version of 'password'
	return await bcrypt.hash(password, 10); //* Uses ten rounds of salt
}

module.exports = encryptPassword;
