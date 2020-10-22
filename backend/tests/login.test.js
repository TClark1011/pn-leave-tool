const mongoose = require("mongoose");

const supertest = require("supertest");

let app;
let api;

//# Reset express server between tests
beforeEach(() => {
	app = require("../app");
	api = supertest(app);
});
afterEach((done) => {
	delete require.cache[require.resolve("../app")];
	done();
});

//# Close mongoose connection at end of tests
afterAll(() => {
	mongoose.connection.close();
});

//# Constant Test Data
const devtestCredentials = {
	employee_number: 1,
	password: "p",
};

test("can login to devtest user account", async (done) => {
	await api
		.post("/api/users/login")
		.send(devtestCredentials)
		.expect("Content-Type", /json/)
		.expect(200);
	done();
});

test("devtest login with incorrect password fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			employee_number: devtestCredentials.employee_number,
			password: `!${devtestCredentials.password}`,
		})
		.expect("Content-Type", /json/)
		.expect(401);
	done();
});

test("login with non-existant employee_number fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			employee_number: -1,
			password: -1,
		})
		.expect("Content-Type", /json/)
		.expect(401);
	done();
});

test("login with missing employee_number field fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			password: devtestCredentials.password,
		})
		.expect("Content-Type", /json/)
		.expect(500);
	done();
});

test("login with missing password field fails", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			employee_number: devtestCredentials.employee_number,
		})
		.expect("Content-Type", /json/)
		.expect(500);
	done();
});
