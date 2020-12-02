const csv = require("csv-parse");
const fs = require("fs");

module.exports = async function (csvData) {
	const rows = [];
	await fs
		.createReadStream("sample.csv")
		.pipe(csv())
		.on("data", (row) => {
			rows.push(row);
		})
		.on("end", () => {
			console.log("CSV file successfully processed");
			console.log("leave days dict: ", leaveDict(rows));
		});

	/**
	 * Generate a dict with dates as keys and the number of rostered of drivers as the values
	 * @param {Array[String][]} rows - The row data pulled from the csv data
	 */
	function leaveDict(rows) {
		var result = {};
		for (let i = 1; i < rows[0].length; i++) {
			result[rows[0][i]] = getColumnOffDays(rows, i - 1);
		}
		return result;
	}

	/**
	 * Get how many rostered off drivers there are on a given day (column)
	 * @param {Object} rows - All the rows in the roster dataset
	 * @param {Number} column - The column to use. is 0-indexed not including the leftmost column which only contains names/other irrelevant data
	 */
	function getColumnOffDays(rows, column) {
		var total = 0;
		const rowCount = rows.length;

		for (let i = 2; i < rowCount; i++) {
			const isOffDay = rows[i][column + 1] !== "";
			total += Number(isOffDay);
		}
		return total;
	}
};
