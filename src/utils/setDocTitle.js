/**
 * Set the title of the HTML document
 *
 * @param {string} title The title to set for the document
 * @param {string} [postfix=" - PN Leave Tool"] Extra text that is appended to the end of the title
 */
function setDocTitle(title, postfix = " - PN Leave Tool") {
	document.title = title + postfix;
}

export default setDocTitle;
