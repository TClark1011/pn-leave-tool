module.exports = (response) => {
	delete response.body._id;
	delete response.body.__v;
};
