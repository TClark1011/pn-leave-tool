function australianDate(date) {
	date = new Date(date);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export default australianDate;
