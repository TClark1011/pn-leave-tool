/**
 * Search an array of objects and return the first item that contains a provided key/value pair
 * @param {object[]} array The array of objects
 * @param {object} find Key/value pair to be searched for
 * @returns {object | null} Return the matching object, null if no matching object is found
 */
const findObjectInArray = (array, find) => {
	const targetPairKeys = Object.keys(find);

	if (array.every((item) => typeof item !== typeof {})) {
		throw TypeError("'array' parameter must consist of an array of objects");
	} else if (targetPairKeys.length > 1) {
		throw TypeError("'find' parameter must consist of a single key/value pair");
	}

	const key = targetPairKeys[0];
	const value = find[key];
	for (const item of array) {
		if (item[key] === value) {
			return item;
		}
	}
	return null;
};

export default findObjectInArray;
