const mongoose = require("mongoose");
const supertest = require("supertest");

const randomDates = require("./resources/randomDates");

const testCredentials = require("./resources/testCredentials");

let app = require("../app");
const makeTempDepot = require("./resources/makeTempDepot");
let api = supertest(app);

var token = null;
let depot;

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
	depot = await makeTempDepot(api);
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
	await depot.delete();
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
