/**
 * Set multiple css properties to a single value
 *
 * @param {string} value The css value to apply to each property
 * @param {string[]} properties An array of css properties to apply 'value' to
 * @returns {string} A css sting that can be used in styled-components
 */
export const setMultipleProperties = (value, properties) => {
	const cssArray = [];
	properties.map((item) => cssArray.push(`${item}:${value};`));
	return cssArray.join("");
};
