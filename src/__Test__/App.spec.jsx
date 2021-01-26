it("Renders the root element", () => {
	render(<App />);
	const rootEl = document.getElementById("__App-Root__");
	expect(rootEl).toBeInTheDocument();
});
