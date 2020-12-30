require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");
const random = require("random");

let app = require("../app");
const Depot = require("../models/depot");
let api = supertest(app);

let newDepotId;

beforeEach(() => {
	app = require("../app");
	api = supertest(app);
});

afterEach((done) => {
	delete require.cache[require.resolve("../app")];
	//? We 'un-import' the 'app.js' file, then in the 'beforeEach()' function above, we 're-import' it.
	//? This resets the server between every test.
	done();
});

afterAll(() => {
	mongoose.connection.close();
});

test("can fetch depots", async (done) => {
	await api.get("/api/depots").expect("Content-Type", /json/).expect(200);
	done();
});

test("can add a new depot", async (done) => {
	const name = `Temp Depot - add depot test - ${random.int(1, 10000000)}`;
	const drivers = random.int(10, 100);
	await api
		.post("/api/depots")
		.send({
			name,
			drivers,
			hidden: true,
		})
		.set("operator_access_key", process.env.OPERATOR_ACCESS_KEY)
		.expect((response) => {
			newDepotId = response.body._id;
			response.body = {
				drivers: response.body.drivers,
				name: response.body.name,
			};
			//? We set the response body to only contain the fields we want to check
		})
		.expect(200, {
			name,
			drivers,
		});
	done();
});

test("can delete depot", async (done) => {
	const url = `/api/depots/${newDepotId}`;
	await api
		.delete(url)
		.set("operator_access_key", process.env.OPERATOR_ACCESS_KEY)
		.expect(200);
	done();
});
