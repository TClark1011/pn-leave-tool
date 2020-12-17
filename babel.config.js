module.exports = {
	plugins: [
		["@babel/plugin-proposal-class-properties", { loose: true }],
		"react-hot-loader/babel",
	],
	presets: ["@babel/preset-react"],
};
