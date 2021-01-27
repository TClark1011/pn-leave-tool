export const setMultipleProperties = (value, properties) => {
	const cssArray = [];
	properties.map((item) => cssArray.push(`${item}:${value};`));
	return cssArray.join("");
};
