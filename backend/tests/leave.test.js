require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");

const randomDates = require("./resources/randomDates");

const testCredentials = require("./resources/testCredentials");

let app = require("../app");
const makeTempDepot = require("./resources/makeTempDepot");
const { addDays } = require("date-fns");
let api = supertest(app);

var token = null;
let depot;

/**
 * Return promise for standard post request for annual leave
 * @param {Object} dates - The dates for the leave request
 * @param {Date} dates.start - Start date
 * @param {Date} dates.end - End date
 */
function sendLeaveRequest(dates) {
	return api
		.post("/api/leave/request")
		.send({
			user: testCredentials.employee_number,
			dates,
			depot: depot.id,
		})
		.set("authorisation", token)
		.expect("Content-Type", /json/);
}

beforeAll(async (done) => {
	await api
		.post("/api/users/login")
		.send(testCredentials)
		.then((response) => {
			token = response.body.token;
		});
	depot = await makeTempDepot(api, { drivers: 10 });
	done();
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

afterAll(async () => {
	mongoose.connection.close();
	// await depot.delete();
});

test("can submit leave", async (done) => {
	await sendLeaveRequest(randomDates())
		.expect((response) => {
			const { approved } = response.body;
			response.body = {
				approved,
			};
		})
		.expect(200, {
			approved: true,
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

test("Percentage based leave evaluation is working correctly", async (done) => {
	//# This is written to test a requiredWorkforce of 0.9
	const startDate = randomDates().start;
	// const startDate = addDays(new Date(), 100);
	const endDate = addDays(startDate, 2);

	const sendAndExpect = async (status, approval) =>
		await sendLeaveRequest({ start: startDate, end: endDate })
			.expect((response) => {
				response.body = { approved: response.body.approved };
			})
			.expect(status, {
				approved: approval,
			});
	await sendAndExpect(200, true);
	await sendAndExpect(500, false);
	done();
});
