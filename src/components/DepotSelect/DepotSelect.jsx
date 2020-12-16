import { MenuItem } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { getDepots } from "../../services/depots";
import FormField from "../utility/Forms/FormField";

const DepotSelect = (props) => {
	const { isFetching, error, data } = useQuery("depots", getDepots);
	return (
		<FormField select {...props}>
			{data && !isFetching ? (
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
