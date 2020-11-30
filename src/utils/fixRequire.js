//# Fix an issue with requiring functions from 'date-fns' v2

module.exports = (requiredItem, expectedType) => {
	expectedType = expectedType || "function";
	if (typeof requiredItem === expectedType) {
		return requiredItem;
	}
	return requiredItem.default;
};
