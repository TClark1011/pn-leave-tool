import React, { useState } from "react";

import csv2json from "csvjson-csv2json";

import { Card, TextField, Button } from "@material-ui/core";

import { submitLmsData } from "../../../services/admin";
import DepotSelect from "../../DepotSelect/DepotSelect";

const SubmitLmsData = (props) => {
	const [accessKey, setAccessKey] = useState("");
	const [data, setData] = useState(null);
	function onUpload(event) {
		const reader = new FileReader();
		reader.onload = () => {
			const json = csv2json(reader.result, { parseNumbers: true });
			setData(json);
		};
		console.log(event.target.files);
		reader.readAsBinaryString(event.target.files[0]);
	}

	function onSubmit(event) {
		event.preventDefault();
		submitLmsData(data, accessKey)
			.then((result) => {
				console.log("lms data submitted");
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Card className="SubmitLmsDataWrapper">
			<form onSubmit={onSubmit}>
				<input type="file" onChange={onUpload} />
				<DepotSelect />
				<TextField
					value={accessKey}
					onChange={(e) => setAccessKey(e.target.value)}
					fullWidth
					variant="filled"
					label="Access Key"
				/>
				<Button type="submit" variant="contained">
					submit
				</Button>
			</form>
		</Card>
	);
};
export default SubmitLmsData;
