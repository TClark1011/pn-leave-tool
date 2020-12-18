import "./Profile.scss";

import React, { useContext, useState } from "react";

import UserContext from "../utility/UserContext";

import SectionTitle from "../utility/SectionTitle";
import BodyText from "../utility/BodyText";
import { Button, Card, Fab, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
	ArrowBack,
	Close,
	Edit,
	Email,
	HomeWork,
	Person,
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
	const { user, setUser } = useContext(UserContext);
	const [editMode, setEditMode] = useState(false);

	function onSubmit(data, { setSubmitting }) {
		const fullData = { _id: user._id, ...data };
		setSubmitting(true);
		updateUser(fullData)
			.then((result) => {
				setUser(result.body);
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
					<Formik
						initialValues={{
							employee_number: user.employee_number,
							depot: user.depot._id,
							email: user.email,
							name: user.name,
						}}
						validateOnChange={false}
						onSubmit={onSubmit}
					>
						{({ resetForm }) => (
							<Form>
								<SectionTitle>
									{user.name}
									<IconButton
										className="edit-button"
										onClick={() => {
											setEditMode(!editMode);
											resetForm();
										}}
									>
										{editMode ? <Close /> : <Edit />}
									</IconButton>
								</SectionTitle>
								<ProfileContext.Provider value={{ editMode }}>
									<div className={classnames("profile-fields", { editMode })}>
										<Field
											name="name"
											Icon={Person}
											label="Name"
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
											name="employee_number"
											Icon={Work}
											label="Employee Number"
											component={ProfileItem}
											disabled
										/>
										<Field
											name="email"
											Icon={Email}
											label="Email"
											component={ProfileItem}
											disabled
										/>
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
}

export default Profile;
