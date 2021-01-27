import { Tab, Tabs } from "@material-ui/core";
import styled from "styled-components";
import BodyText from "../utility/BodyText";

export const AuthFormsTabsContainer = styled(Tabs)`
	.MuiTabs-flexContainer {
		display: flex;
		justify-content: center;
	}
`;

export const AuthFormTab = styled(Tab).attrs({ disableRipple: true })`
	width: 50%;
	color: black;
	border-color: ${(p) => p.theme.palette.primary.main};
`;

export const AuthHelperTextWrapper = styled(BodyText)`
	margin-bottom: ${(p) => p.theme.spacing(2)}px;
`;
