import styled from "styled-components";
import { spacing } from "../../styles/config/themeSelectors";
import BodyText from "../utility/BodyText";
import StatusMessage from "../utility/StatusMessage";

export const ForgotPasswordHelpText = styled(BodyText)`
	margin-bottom: ${spacing(2)}px;
`;

export const ForgotPasswordStatusMessage = styled(StatusMessage)`
	margin-bottom: ${spacing(2)}px;
`;
