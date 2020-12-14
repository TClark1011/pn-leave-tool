//# How much time can pass before leave items can be deleted
//? Time is in days
//? Denied leave is deleted after the specified amount of time has passed from the request's submission
//? Allowed leave is deleted after the specified amount of time has passed from the leave's end date
module.exports = {
	denied: 14,
	allowed: 365,
};
