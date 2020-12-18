import { MenuItem } from "@material-ui/core";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getDepots } from "../../services/depots";
import FormField from "../utility/Forms/FormField";
import UserContext from "../utility/UserContext";

const DepotSelect = (props) => {
	const { isLoading, error, data } = useQuery("depots", getDepots);
	const { user } = useContext(UserContext);
	return (
		<FormField select defaultValue={user ? user.depot._id : ""} {...props}>
			{data && !isLoading ? (
				data.map((item) => (
					<MenuItem value={item._id} key={item._id}>
						{item.name}
					</MenuItem>
				))
			) : (
				<MenuItem value="a">Loading...</MenuItem>
			)}
		</FormField>
	);
};
export default DepotSelect;
