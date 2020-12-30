//# How much time can pass before leave items can be deleted

//? Time is in days
//? Denied leave is deleted after the specified amount of time has passed from the request's submission
//? Allowed leave is deleted after the specified amount of time has passed from the leave's end date
module.exports.leaveDeleteParameters = {
	denied: 14,
	allowed: 365,
};

//? The percentage of the work force required for a location to function
//? If a leave request would push a workforce under this percentage then it is denied
module.exports.requiredWorkforce = 0.9;
