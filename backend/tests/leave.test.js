const mongoose = require("mongoose");
const supertest = require("supertest");

const addDays = require("date-fns/addDays");
const addWeeks = require("date-fns/addWeeks");
const addYears = require("date-fns/addYears");
const startOfToday = require("date-fns/startOfToday");

const randomInt = require("random-int");

const testCredentials = require("./resources/testCredentials");

let app = require("../app");
let api = supertest(app);

var token = null;

/**
 * Return promise for standard post request for annual leave
 * @param {Object} dates - The dates for the leave request
 */
function sendLeaveRequest(dates) {
	return api
		.post("/api/leave/request")
		.send({
			user: testCredentials.employee_number,
			dates,
		})
		.set("authorisation", token)
		.expect("Content-Type", /json/);
}

/**
 * Generate an object with random dates to use for annual leave submission
 * @param {boolean} [swap=false] - Whether or not to swap the start and end dates
 */
const randomDates = (swap) => {
	swap = swap || false;
	const start = addWeeks(
		addYears(addDays(startOfToday(), randomInt(0, 6)), randomInt(2, 10)),
		randomInt(3, 5)
	);
	const end = addWeeks(addDays(start, randomInt(0, 6)), randomInt(0, 4));
	return {
		start: swap ? end : start,
		end: swap ? start : end,
	};
};

beforeAll((done) => {
	api
		.post("/api/users/login")
		.send(testCredentials)
		.end((err, res) => {
			token = res.body.token;
			done();
		});
});
beforeEach(() => {
	app = require("../app");
	api = supertest(app);
});
afterEach((done) => {
	delete require.cache[require.resolve("../app")];
	//? We 'un-import' the 'app.js' file, then in the 'beforeEach()' method above, we re-import it, resetting the server between every test.
	done();
	//? 'done()' is a function provided by jest that signals that the current test is over
});

//# Close mongoose connection at end of tests
afterAll(() => {
	mongoose.connection.close();
});

test("can submit leave", async (done) => {
	await sendLeaveRequest(randomDates()).expect((response) => {
		if (!("approved" in response.body))
			throw new Error("incorrect response format");
	});
	done();
});

test("end date before start date throws error", async (done) => {
	const dates = randomDates(true);
	await sendLeaveRequest(dates).expect(400);
	done();
});

test("start date too early throws error", async (done) => {
	await sendLeaveRequest({ start: new Date(), end: randomDates().end }).expect(
		400
	);
	done();
});
