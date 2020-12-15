function mongooseConnect(mongoose, url, name) {
	mongoose.set("useFindAndModify", false);
	console.log(`${name} is connecting to ${url}`);
	mongoose
		.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
		.then((result) => {
			console.log(`${name} has connected to MongoDB`);
		})
		.catch((error) => {
			console.log("error connecting too MongoDB: ", error.message);
		});
}

module.exports = mongooseConnect;
