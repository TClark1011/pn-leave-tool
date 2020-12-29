import "./Profile.scss";

import React, { useContext, useEffect, useState } from "react";

import UserContext from "../utility/UserContext";

import SectionTitle from "../utility/SectionTitle";
import { Card, Fab, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
	ArrowBack,
	Close,
	Edit,
	Email,
	HomeWork,
	Person,
	Work,
} from "@material-ui/icons";
import ProfileItem from "./ProfileItem/ProfileItem";

import ProfileContext from "../utility/ProfileContext";

import classnames from "classnames";
import DepotSelect from "../DepotSelect/DepotSelect";
import { Field, Form, Formik } from "formik";
import FormButton from "../utility/Forms/FormButton";

import { updateUser } from "../../services/user";
import profileVal from "../../validation/profileVal";
import { getDepots } from "../../services/depots";
import { object as yupObject } from "yup";
import StatusMessage from "../utility/StatusMessage";

function Profile(props) {
	const { user, setUser } = useContext(UserContext);
	const [editMode, setEditMode] = useState(false);
	const [validation, setValidation] = useState(yupObject());
	const [formMessage, setFormMessage] = useState(null);

	useEffect(() => {
		getDepots().then((result) => setValidation(profileVal(result)));
	}, []);

	useEffect(() => {
		if (editMode) setFormMessage(null);
	}, [editMode]);

	function onSubmit(data, { setSubmitting }) {
		const fullData = { _id: user._id, ...data };
		setSubmitting(true);
		var newMessage = {};
		updateUser(fullData)
			.then((result) => {
				setUser({
					...user,
					employee_number: result.data.employee_number,
					depot: result.data.depot,
					name: result.data.name,
					email: result.data.email,
				});
				newMessage = {
					tone: "positive",
					message: "Your details have been saved",
				};
			})
			.catch((err) => {
				console.log("(Profile) There was an error: ", err);
				newMessage = {
					tone: "negative",
					message: "There was an error. Please try again later.",
				};
			})
			.finally(() => {
				setSubmitting(false);
				setEditMode(false);
				setFormMessage(newMessage);
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
						validationSchema={validation}
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
								<StatusMessage tone={formMessage?.tone}>
									{formMessage?.message}
								</StatusMessage>
								<ProfileContext.Provider value={{ editMode }}>
									<div
										className={classnames("profile-fields", {
											editMode: editMode,
										})}
									>
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
											disabled={editMode}
											helperText={
												editMode &&
												"Changing your employee number is not currently supported."
											}
										/>
										<Field
											name="email"
											Icon={Email}
											label="Email"
											component={ProfileItem}
											disabled={editMode}
											helperText={
												editMode &&
												"Changing your email address is not currently supported."
											}
										/>
									</div>
								</ProfileContext.Provider>
								{editMode && (
									<>
										<FormButton type="submit">Save</FormButton>
										<FormButton
											variant="outlined"
											onClick={() => {
												setEditMode(false);
												resetForm();
											}}
										>
											Cancel
										</FormButton>
									</>
								)}
								{!editMode && (
									<FormButton
										onClick={() => {
											setEditMode(true);
											resetForm();
										}}
									>
										edit
									</FormButton>
								)}
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
