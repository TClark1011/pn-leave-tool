import { Button, List, TextField } from "@material-ui/core";
import ContentCard from "../utility/ContentCard";
import { KeyboardDatePicker } from "@material-ui/pickers";
import styled from "styled-components";
import {
	xMarginsMixin,
	yPaddingMixin,
	flexWrapperMixin,
} from "../../styles/config/mixins";
import { inputBorderGrey } from "../../styles/config/styleVars";
import { setMultipleProperties } from "../../styles/config/utilities";
import BodyText from "../utility/BodyText";

export const LeaveFormDateField = styled(KeyboardDatePicker).attrs({
	autoOk: true,
	inputVariant: "outlined",
	format: "dd/MM/yyyy",
	disablePast: true,
})`
	width: 100%;
	&:not(:first-of-type) {
		margin-bottom: ${(p) => p.theme.spacing(1)}px;
	}
	input {
		text-align: center;
	}
`;

export const LeaveFormExtraData = styled.div`
	width: 100%;
	${(p) =>
		setMultipleProperties(`1px solid ${inputBorderGrey}`, [
			"border-top",
			"border-bottom",
		])}

	${(p) => yPaddingMixin(`${p.theme.spacing(1)}px`)}
	margin-bottom: ${(p) => p.theme.spacing(1)}px;
`;

export const LeaveFormLeaveLengthField = styled(TextField)`
	width: 3.8em;

	display: inline-block;

	${(p) => xMarginsMixin(`${p.theme.spacing(0.5)}px`)}

	input {
		padding: ${(p) => p.theme.spacing(0.5)}px;
	}
`;

export const LeaveFormDivider = styled(BodyText)`
	${flexWrapperMixin({ align: "center", justify: "space-around" })}
	text-align: center;
	width: 100%;

	margin-bottom: 0 !important;
	&::before,
	&::after {
		content: "";
		flex: 1;
		border-bottom: 1px solid ${inputBorderGrey};
	}
	&::before {
		margin-right: 0.25em;
	}
	&::after {
		margin-left: 0.25em;
	}
`;

export const LeaveFormResponseInnerModal = styled.div`
	margin: auto;
	width: 100%;
	height: 100%;
	display: flex;

	button {
		margin-top: ${(p) => p.theme.spacing(1)}px;
	}
`;

export const LeaveFormResponseResultCard = styled(ContentCard)`
	margin: auto;
	width: 500px;
	max-width: 90vw;
`;

export const LeaveFormResponseInvalidDaysList = styled(List)`
	list-style: none;
	padding-left: 0;
	margin: 0;
	margin-top: $spacing-1;
	font-weight: bold;

	li {
		padding: 0;
	}

	li::before {
		padding-right: $spacing-2;
		content: "-";
	}
`;

export const LeaveFromResponseButton = styled(Button)`
	margin-top: ${(p) => p.theme.spacing(1)}px;
`;
