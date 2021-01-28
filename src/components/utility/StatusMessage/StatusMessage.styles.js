import { lighten } from "@material-ui/core";
import styled from "styled-components";
import { color, spacing } from "../../../styles/config/themeSelectors";

const getToneColor = (tone) =>
	({
		positive: "success",
		negative: "error",
		neutral: "primary",
	}[tone]);

export const StatusMessageRoot = styled.div`
	padding: ${spacing(3)}px;
	background-color: ${(props) => {
		const colorString = getToneColor(props.tone);
		return lighten(color(colorString + ".light")(props), 0.8);
	}};
	border-left: 4px solid ${(p) => color(getToneColor(p.tone) + ".dark")(p)};
	margin-bottom: ${spacing(3)}px;
`;
