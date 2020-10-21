/**
 * Return user object with secret information removed
 * @param {Object} user - The user record pulled from database
 * @returns {Object} copy of user object with the '__v', '_id' and 'password' keys deleted
 */
function sanitiseUser(user) {
	//# Remove data that is unsafe for frontend
	const frontendUser = JSON.parse(JSON.stringify(user)); //# Create a shallow copy to allow field deletion
	delete frontendUser.password;
	delete frontendUser.__v;
	delete frontendUser._id;
	return frontendUser;
}

module.exports = sanitiseUser;
