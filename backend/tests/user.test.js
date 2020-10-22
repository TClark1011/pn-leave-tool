const mongoose = require("mongoose");

const supertest = require("supertest");

let app;
let api;

beforeEach(() => {
	app = require("../app");
	api = supertest(app);
});

afterEach((done) => {
	delete require.cache[require.resolve("../app")];
	done();
});

afterAll(() => {
	mongoose.connection.close();
});

test("can login to devtest user account", async (done) => {
	await api
		.post("/api/users/login")
		.send({
			employee_number: 1,
			password: "p",
		})
		.expect("Content-Type", /json/)
		.expect(200);
	done();
});
