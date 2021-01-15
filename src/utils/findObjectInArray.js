/**
 * Search an array of objects and return the first item that contains a provided key/value pair
 * @param {object[]} array The array of objects
 * @param {object} find Key/value pair to be searched for
 * @returns {object | null} Return the matching object, null if no matching object is found
 */
const findObjectInArray = (array, find) => {
	const key = Object.keys(find)[0];
	const value = find[key];
	for (const item of array) {
		if (item[key] === value) {
			return item;
		}
	}
	return null;
};

export default findObjectInArray;
