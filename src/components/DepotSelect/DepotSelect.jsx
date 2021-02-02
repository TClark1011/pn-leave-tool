import { MenuItem } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { getDepots } from "../../services/depots";
import DebugSpan from "../utility/DebugSpan/DebugSpan";
import FormField from "../utility/Forms/FormField";
import UserContext from "../utility/UserContext";
import { useMount } from "react-use";

/**
 * 'select' input for selecting a depot. Is used
 * in 'RegisterForm', 'Profile' and 'SubmitLmsData'
 *
 * @param {object} props The component props
 * @param {ReactNode} props.children The component children
 * @returns {ReactNode} 'select' input for selecting a depot
 */
const DepotSelect = (props) => {
	const [depots, setDepots] = useState(null);
	useMount(() => {
		//# Fetch list of depots
		getDepots()
			.then((result) => {
				setDepots(result);
			})
			.catch((err) => setDepots("error"));
	});

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
