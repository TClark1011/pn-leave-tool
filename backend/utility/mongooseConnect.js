function mongooseConnect(mongoose, url) {
	mongoose.set("useFindAndModify", false);
	console.log(`connecting to ${url}`);
	mongoose
		.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
		.then((result) => {
			console.log("connected to MongoDB");
		})
		.catch((error) => {
			console.log("error connecting too MongoDB: ", error.message);
		});
}

module.exports = mongooseConnect;
