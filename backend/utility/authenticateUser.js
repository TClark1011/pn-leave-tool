const bcrypt = require("bcrypt");

async function authenticateUser(user, receivedPassword) {
	//# Returns true/false depending on if 'receivedPassword' matches the user's encrypted password
	return (await bcrypt.compare(receivedPassword, user.password)) ? true : false;
}

module.exports = authenticateUser;
