import React, { useState, useContext } from "react";

import { submitLeave } from "../../services/leave";

import { Formik, Form, Field } from "formik";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import DateFnsUtils from "@date-io/date-fns";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
	addDays,
	startOfDay,
	differenceInDays,
	format as formatDate,
	isValid as isValidDate,
	max as maxDate,
} from "date-fns";

import UserContext from "../utility/UserContext";

import {
	leaveLength,
	leaveStartMinOffset,
	leaveVal,
} from "pn-leave-tool-common";

import StatusMessage from "../utility/StatusMessage";
import SectionTitle from "../utility/SectionTitle";
import BodyText from "../utility/BodyText";
import FormButton from "../utility/Forms/FormButton";
import { Box, ListItem } from "@material-ui/core";
import {
	LeaveFormLeaveLengthField,
	LeaveFormExtraData,
	LeaveFormDivider,
	LeaveFormResponseInnerModal,
	LeaveFormResponseResultCard,
	LeaveFormResponseInvalidDaysList,
	LeaveFormDateField,
	LeaveFormBadDayText,
} from "./LeaveForm.styles";
import useDocTitle from "../../utils/useDocTitle";

export const leaveFormInstructions =
	"To get an estimation of the availability of annual leave, enter the start and end dates for your desired annual leave and then press 'Submit'.";

/**
 * Form for submitting leave request
 *
 * @returns {ReactNode} The form for submitting leave
 */
const LeaveForm = () => {
	useDocTitle("Submit");
	const { user } = useContext(UserContext);

	const minDate = startOfDay(addDays(new Date(), leaveStartMinOffset + 1));
	//? For whatever reason, if you don't add one to 'leaveStartMinOffset' then the date will be 1 behind
	const [startDate, setStartDate] = useState(minDate);
	const [endDate, setEndDate] = useState(addDays(startDate, 1));
	const [response, setResponse] = useState(null);
	const [showAllBadDays, setShowAllBadDays] = useState(false);

	/**
	 * Update leave length field
	 *
	 * @param {Date} currentStartDate Start date
	 * @param {Date} currentEndDate End Date
	 */
	const updateLengthField = (currentStartDate, currentEndDate) => {
		lengthFieldRef.current.value =
			differenceInDays(currentStartDate, currentEndDate) || 1;
	};

	/**
	 * Updates the start date after checking if its valid
	 *
	 * @param {Date} date the new start date
	 * @param {Function} setFieldValue The function
	 * provided by Formik to set form field values
	 */
	const updateStartDate = (date, setFieldValue) => {
		if (isValidDate(date)) {
			const newStartDate = startOfDay(date);
			const newEndDate = maxDate([endDate, addDays(date, 1)]);
			setStartDate(newStartDate);
			setEndDate(newEndDate);
			if (setFieldValue) {
				setFieldValue("dates.start", newStartDate);
				setFieldValue("dates.end", newEndDate);
			}

			updateLengthField(newEndDate, date);
		}
	};

	/**
	 * Updates the end date after checking if its valid
	 *
	 * @param {Date} date The new end date
	 * @param {Function} setFieldValue The function
	 * provided by Formik to set form field values
	 */
	const updateEndDate = (date, setFieldValue) => {
		if (isValidDate(date)) {
			const newEndDate = startOfDay(addDays(date, -1));
			setEndDate(newEndDate);

			if (setFieldValue) {
				setFieldValue("dates.end", newEndDate);
			}

			updateLengthField(date, startDate);
		}
	};

	/**
	 * Handle form submission
	 *
	 * @param {object} data Form data from formik
	 * @param {object} extraFormProps Extra form data
	 * provided by formik
	 * @param {Function} extraFormProps.setSubmitting
	 * Function to set whether or not the form is currently
	 * submitting
	 */
	const onSubmit = (data, { setSubmitting }) => {
		console.log("(LeaveForm) data: ", data);
		setSubmitting(true);
		submitLeave(data)
			.then((result) => {
				setResponse(result.data);
			})
			.catch((error) => {
				setResponse(
					error.response?.data || "There was an error, please try again later",
				);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	/**
	 * Limit the length of a 'number' typed input to 3 characters
	 *
	 * @param {Event} e - The 'onInput' event of the field
	 */
	const limitLength = (e) => {
		e.target.value = e.target.value.toString().slice(0, 3);
	};

	/**
	 * Check whether or not the passed value would be a
	 * valid input into the leave length field
	 *
	 * @param {string} value The value of the length field
	 * @param {boolean} [allowBlank=false] Whether or not to
	 * allow the length field to be blank
	 * @returns {boolean} Whether or not the new length value
	 * is valid
	 */
	const validateLengthField = (value, allowBlank = false) => {
		return (value.length > 0 || allowBlank) && value >= 2;
	};

	/**
	 * Handle length field changing
	 *
	 * @param {Event} e Event data
	 * @param {Function} setFieldValue function to set field value
	 */
	const onLengthFieldChange = (e, setFieldValue) => {
		const newValue = e.target.value;
		if (validateLengthField(newValue)) {
			const updatedLength = Math.max(1, newValue || 0);
			updateEndDate(addDays(startDate, updatedLength), setFieldValue);
		}
	};

	/**
	 * When the user stops focusing length field. If contents of
	 * length field are invalid when user exits focus, set its value
	 * to the difference between the currently selected start and
	 * end dates.
	 *
	 * @param {Event} e The 'onBlur' event fired by
	 * focusing leaving the length field
	 */
	const lengthFieldFocusOut = (e) => {
		if (!validateLengthField(e.target.value)) {
			e.target.value = differenceInDays(endDate, startDate);
		}
	};
	const lengthFieldRef = React.createRef();

	const showBadDays = 5;
	//? How many bad days to show if request is denied before paginating them
	return (
		<Box>
			<SectionTitle>Submit Leave Request</SectionTitle>
			<Formik
				initialValues={{
					user: user.employee_number,
					dates: {
						start: minDate,
						end: addDays(minDate, 1),
					},
				}}
				onSubmit={onSubmit}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={leaveVal}
			>
				{({ isSubmitting, setFieldValue }) => (
					<Form>
						<BodyText>{leaveFormInstructions}</BodyText>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<LeaveFormDateField
								name="dates.start"
								value={startDate}
								onChange={(value) => {
									updateStartDate(value, setFieldValue);
								}}
								minDate={startDate}
							/>
							<LeaveFormDivider>To</LeaveFormDivider>
							<LeaveFormDateField
								name="dates.end"
								value={endDate}
								onChange={(value, string) => {
									updateEndDate(value, setFieldValue);
								}}
								minDate={addDays(startDate, leaveLength.min)}
								maxDate={addDays(startDate, leaveLength.max)}
							/>
						</MuiPickersUtilsProvider>
						<LeaveFormExtraData>
							<BodyText component="span">Your leave is</BodyText>
							<LeaveFormLeaveLengthField
								onInput={limitLength}
								onChange={(e) => onLengthFieldChange(e, setFieldValue)}
								inputRef={lengthFieldRef}
								type="number"
								variant="outlined"
								onBlur={lengthFieldFocusOut}
								defaultValue={`${leaveLength.min + 1}`}
							/>
							<BodyText component="span">days long</BodyText>
						</LeaveFormExtraData>
						<Field name="user" type="hidden" value={user.employee_number} />
						<FormButton type="submit" disabled={isSubmitting}>
							{isSubmitting ? "loading" : "submit"}
						</FormButton>
						{isSubmitting && (
							<BodyText component="sup" variant="sup">
								Leave evaluation may take several seconds
							</BodyText>
						)}
					</Form>
				)}
			</Formik>
			<Modal open={!!response}>
				<LeaveFormResponseInnerModal>
					<LeaveFormResponseResultCard>
						<StatusMessage tone={response?.tone || "negative"} hideSupportMsg>
							{response && (
								<>
									<BodyText>{response?.message.split("@break@")[0]} </BodyText>
									{/* The '@break@' text is used  in error messages to indicate 
									that the message should be broken up when displayed in the frontend.*/}
									{response?.extraData && (
										<LeaveFormResponseInvalidDaysList>
											{response.extraData.map((item, index) => (
												<ListItem
													style={
														index >= showBadDays && !showAllBadDays
															? { display: "none" }
															: {}
													}
													// ? Hide extra bad days unless user has asked to see all of them
												>
													<LeaveFormBadDayText>
														{formatDate(new Date(item.date), "MMMM do yyyy")}
													</LeaveFormBadDayText>
												</ListItem>
											))}
											{response.extraData.length > showBadDays &&
												!showAllBadDays && (
													<>
														<BodyText>
															And {response.extraData.length - showBadDays} more
														</BodyText>
														<Button onClick={() => setShowAllBadDays(true)}>
															Show All Unavailable Dates
														</Button>
													</>
												)}
										</LeaveFormResponseInvalidDaysList>
									)}
									<BodyText>{response?.message.split("@break@")[1]} </BodyText>
								</>
							)}
							{/* TODO: Paginate invalid days */}
						</StatusMessage>
						<Button variant="outlined" onClick={() => setResponse(null)}>
							return
						</Button>
					</LeaveFormResponseResultCard>
				</LeaveFormResponseInnerModal>
			</Modal>
		</Box>
	);
};

export default LeaveForm;
