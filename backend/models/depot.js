const mongoose = require("mongoose");
const mongooseConnect = require("../utility/mongooseConnect");

mongooseConnect(mongoose, process.env.MONGO_URI);

const depotSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	drivers: { type: Number, required: true },
});

const Depot = mongoose.model("depot", depotSchema);

module.exports = Depot;
