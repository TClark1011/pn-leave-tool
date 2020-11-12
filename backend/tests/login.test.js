const mongoose = require("mongoose");
const supertest = require("supertest");

const testCredentials = require("./resources/testCredentials");

let app;
let api;

//# Reset express server between tests
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

test("can login to devtest user account", async (done) => {
	await api
		.post("/api/users/login")
		.send(testCredentials)
		.expect("Content-Type", /json/)
		.expect(200);
	done();
});

test("devtest login with incorrect password fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			employee_number: testCredentials.employee_number,
			password: `!${testCredentials.password}`,
		})
		.expect("Content-Type", /json/)
		.expect(401);
	done();
});

test("login with non-existant employee_number fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			employee_number: "-1",
			password: "-1",
		})
		.expect("Content-Type", /json/)
		.expect(400);
	done();
});

test("login with missing employee_number field fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			password: testCredentials.password,
		})
		.expect("Content-Type", /json/)
		.expect(400);
	done();
});

test("login with missing password field fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			employee_number: testCredentials.employee_number,
		})
		.expect("Content-Type", /json/)
		.expect(400);
	done();
});

//TODO: Login with users and check response is different
//TODO: Register account, then login as that account and check the details are correct
