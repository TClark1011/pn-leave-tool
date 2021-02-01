import React, { useContext, useEffect, useState } from "react";

import UserContext from "../utility/UserContext";

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

import DepotSelect from "../DepotSelect/DepotSelect";
import { Field, Form, Formik } from "formik";
import FormButton from "../utility/Forms/FormButton";

import { updateUser } from "../../services/user";
import { getProfileVal } from "pn-leave-tool-common";
import { getDepots } from "../../services/depots";
import { object as yupObject } from "yup";
import StatusMessage from "../utility/StatusMessage";
import findObjectInArray from "../../utils/findObjectInArray";
import setDocTitle from "../../utils/setDocTitle";
import ContentCard from "../utility/ContentCard";
import {
	ProfileEditButton,
	ProfileExitButton,
	ProfileFieldsContainer,
	ProfileRoot,
	ProfileSectionTitle,
	ProfileTopWrapper,
} from "./Profile.styles";

/**
 * The profile screen
 *
 * @returns {ReactNode} The profile screen
 */
const Profile = () => {
	setDocTitle("Profile");
	const { user, setUser } = useContext(UserContext);
	const [editMode, setEditMode] = useState(false);
	const [validation, setValidation] = useState(yupObject());
	const [formMessage, setFormMessage] = useState(null);
	const [depots, setDepots] = useState([]);

	useEffect(() => {
		getDepots().then((result) => {
			setValidation(getProfileVal(result));
			setDepots(result);
		});
	}, []);

	useEffect(() => {
		if (editMode) setFormMessage(null);
	}, [editMode]);

	const onSubmit = (data, { setSubmitting }) => {
		const fullData = { _id: user._id, ...data };
		setSubmitting(true);
		updateUser(fullData)
			.then((result) => {
				const { depot, name } = result.data.extraData;
				setUser({
					...user,
					employee_number: result.data.extraData.employee_number,
					depot: findObjectInArray(depots, { _id: depot }),
					name,
				});
				const { tone, message } = result.data;
				setFormMessage({
					tone,
					message,
				});
			})
			.finally(() => {
				setSubmitting(false);
				setEditMode(false);
			});
	};

	return (
		<>
			<ContentCard>
				<ProfileRoot editMode={editMode}>
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
						{({ resetForm, isSubmitting }) => (
							<Form>
								<ProfileTopWrapper>
									<ProfileSectionTitle>{user.name}</ProfileSectionTitle>
									<ProfileEditButton
										onClick={() => {
											setEditMode(!editMode);
											resetForm();
										}}
									>
										{editMode ? <Close /> : <Edit />}
									</ProfileEditButton>
								</ProfileTopWrapper>
								<StatusMessage tone={formMessage?.tone}>
									{formMessage?.message}
								</StatusMessage>
								<ProfileContext.Provider value={{ editMode }}>
									<ProfileFieldsContainer>
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
									</ProfileFieldsContainer>
								</ProfileContext.Provider>
								{editMode && (
									<>
										<FormButton type="submit" disabled={isSubmitting}>
											{isSubmitting ? "loading" : "save"}
										</FormButton>
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
				</ProfileRoot>
			</ContentCard>
			<ProfileExitButton component={Link} to="/request">
				<ArrowBack />
				return
			</ProfileExitButton>
		</>
	);
};

export default Profile;
