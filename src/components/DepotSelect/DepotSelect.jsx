import { MenuItem } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getDepots } from "../../services/depots";
import DebugSpan from "../utility/DebugSpan/DebugSpan";
import FormField from "../utility/Forms/FormField";
import UserContext from "../utility/UserContext";

const DepotSelect = (props) => {
	const [depots, setDepots] = useState(null);
	useEffect(() => {
		getDepots()
			.then((result) => {
				setDepots(result);
			})
			.catch((err) => setDepots("error"));
	}, []);
	const { user } = useContext(UserContext);
	return (
		<FormField select defaultValue={user ? user.depot._id : ""} {...props}>
			{depots && depots !== "error" ? (
				depots
					.filter(
						(item) => process.env.NODE_ENV === "development" || !item.hidden,
					)
					.map((item) => (
						<MenuItem value={item._id} key={item._id}>
							{item.name}
							<DebugSpan extraCondition={item.hidden} />
						</MenuItem>
					))
			) : (
				<MenuItem>Loading...</MenuItem>
			)}
			{depots === "error" && <MenuItem>Error</MenuItem>}
		</FormField>
	);
};
export default DepotSelect;
