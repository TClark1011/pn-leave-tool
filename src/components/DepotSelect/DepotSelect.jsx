import { MenuItem } from "@material-ui/core";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getDepots } from "../../services/depots";
import DebugSpan from "../utility/DebugSpan/DebugSpan";
import FormField from "../utility/Forms/FormField";
import UserContext from "../utility/UserContext";

const DepotSelect = (props) => {
	const { isLoading, error, data } = useQuery("depots", getDepots);
	const { user } = useContext(UserContext);
	return (
		<FormField select defaultValue={user ? user.depot._id : ""} {...props}>
			{data && !isLoading ? (
				data
					.filter(
						(item) => process.env.NODE_ENV === "development" || !item.hidden
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
			{error && <MenuItem>Error</MenuItem>}
		</FormField>
	);
};
export default DepotSelect;
