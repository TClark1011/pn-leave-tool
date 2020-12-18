import "./Profile.scss";

import React, { useContext, useState } from "react";

import UserContext from "../utility/UserContext";

import SectionTitle from "../utility/SectionTitle";
import BodyText from "../utility/BodyText";
import { Button, Card, Fab, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
	ArrowBack,
	Edit,
	Email,
	HomeWork,
	Phone,
	Save,
	Work,
} from "@material-ui/icons";
import ProfileItem from "./ProfileItem/ProfileItem";

import ProfileContext from "../utility/ProfileContext";

import classnames from "classnames";
import DepotSelect from "../DepotSelect/DepotSelect";
import { Field, Form, Formik } from "formik";
import FormButton from "../utility/Forms/FormButton";

import { updateUser } from "../../services/user";

function Profile(props) {
	const { user } = useContext(UserContext);
	const [editMode, setEditMode] = useState(false);

	console.log("(Profile) user: ", user);

	function toggleEditMode() {
		setEditMode(!editMode);
	}

	async function onSubmit(data, { setSubmitting }) {
		const fullData = { _id: user._id, ...data };
		console.log(
			"(Profile) pre submission data param (with '_id' added): ",
			fullData
		);
		setSubmitting(true);
		updateUser(fullData)
			.then((result) => {
				console.log("(Profile) profile submission result: ", result);
			})
			.catch((err) => {
				console.log("(Profile) There was an error: ", err);
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	return (
		<>
			<Card className="card">
				<div className="ProfilePage">
					<SectionTitle>
						{user.first_name} {user.last_name}
						<IconButton className="edit-button" onClick={toggleEditMode}>
							{editMode ? <Save /> : <Edit />}
						</IconButton>
					</SectionTitle>

					<Formik
						initialValues={{
							employee_number: user.employee_number,
							depot: user.depot._id,
							email: user.email,
							phone: user.phone,
						}}
						validateOnChange={false}
						onSubmit={onSubmit}
					>
						{() => (
							<Form>
								<ProfileContext.Provider value={{ editMode }}>
									<div className={classnames("profile-fields", { editMode })}>
										<Field
											name="employee_number"
											Icon={Work}
											label="Employee Number"
											component={ProfileItem}
										/>
										<Field
											name="depot"
											Icon={HomeWork}
											label="Depot"
											component={ProfileItem}
											ItemComponent={DepotSelect}
										/>
										<Field
											name="email"
											Icon={Email}
											label="Email"
											component={ProfileItem}
										/>
										<Field
											name="phone"
											Icon={Phone}
											label="Phone"
											component={ProfileItem}
										>
											{user.phone}
										</Field>
									</div>
								</ProfileContext.Provider>
								{editMode && <FormButton type="submit">Save</FormButton>}
							</Form>
						)}
					</Formik>
				</div>
			</Card>
			<Fab
				variant="extended"
				component={Link}
				to="/request"
				color="primary"
				className="backToRequestsButton"
			>
				<ArrowBack />
				<label htmlFor="">return</label>
			</Fab>
		</>
	);
	//TODO: Styling
}

export default Profile;
