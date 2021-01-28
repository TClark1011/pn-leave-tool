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
import setDocTitle from "../../utils/setDocTitle";
import {
	LeaveFormLeaveLengthField,
	LeaveFormExtraData,
	LeaveFormDivider,
	LeaveFormResponseInnerModal,
	LeaveFormResponseResultCard,
	LeaveFormResponseInvalidDaysList,
	LeaveFormDateField,
} from "./LeaveForm.styles";

function LeaveForm(props) {
	setDocTitle("Submit");
	const { user } = useContext(UserContext);

	const minDate = startOfDay(addDays(new Date(), leaveStartMinOffset + 1));
	//?For whatever reason, if you don't add one to 'leaveStartMinOffset' then the date will be 1 behind
	const [startDate, setStartDate] = useState(minDate);
	const [endDate, setEndDate] = useState(addDays(startDate, 1));
	const [response, setResponse] = useState(null);

	function updateLengthField(date1, date2) {
		lengthFieldRef.current.value = differenceInDays(date1, date2) + 1 || 1;
	}

	function updateStartDate(date, string, setFieldValue) {
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
	}
	function updateEndDate(date, string, setFieldValue) {
		if (isValidDate(date)) {
			const newEndDate = startOfDay(date);
			setEndDate(newEndDate);

			if (setFieldValue) {
				setFieldValue("dates.end", newEndDate);
			}

			updateLengthField(date, startDate);
		}
	}

	function onSubmit(data, { setSubmitting }) {
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
	}

	/**
	 * Limit the length of a 'number' typed input to 3 characters
	 * @param {Object} e - The 'onInput' event of the field
	 */
	function limitLength(e) {
		e.target.value = e.target.value.toString().slice(0, 3);
	}

	/**
	 * Check whether or not the passed value would be a valid input into the leave length field
	 */
	function validateLengthField(value, allowBlank) {
		allowBlank = allowBlank || false;
		return (value.length > 0 || allowBlank) && value > 0;
	}

	function onLengthFieldChange(e, setFieldValue) {
		const newValue = e.target.value;
		if (validateLengthField(newValue)) {
			const updatedLength = Math.max(1, newValue || 0);
			updateEndDate(addDays(startDate, updatedLength), setFieldValue);
		}
	}

	function lengthFieldFocusOut(e) {
		if (!validateLengthField(e.target.value)) {
			e.target.value = differenceInDays(endDate, startDate);
		}
	}
	const lengthFieldRef = React.createRef();
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
						<BodyText>
							To get an estimation of the availability of annual leave, enter
							the start and end dates for your desired annual leave and then
							press 'Submit'.
						</BodyText>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<LeaveFormDateField
								value={startDate}
								onChange={(value, string) => {
									updateStartDate(value, string, setFieldValue);
								}}
								minDate={startDate}
							/>
							<LeaveFormDivider>To</LeaveFormDivider>
							<LeaveFormDateField
								value={endDate}
								onChange={(value, string) => {
									updateEndDate(value, string, setFieldValue);
								}}
								minDate={addDays(startDate, leaveLength.min)}
								maxDate={addDays(startDate, leaveLength.max - 1)}
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
						<StatusMessage tone={response?.tone || "negative"}>
							{response && (
								<>
									{response?.message.split("@break@")[0]}{" "}
									<LeaveFormResponseInvalidDaysList>
										{response?.extraData?.map((item) => (
											<ListItem>
												{formatDate(new Date(item.date), "MMMM do yyyy")}
											</ListItem>
										))}
									</LeaveFormResponseInvalidDaysList>
									{response?.message.split("@break@")[1]}{" "}
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
}

export default LeaveForm;
