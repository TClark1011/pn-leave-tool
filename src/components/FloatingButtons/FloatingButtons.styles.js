import styled from "styled-components";
import { setMultipleProperties } from "../../styles/config/utilities";

export const FloatingButtonsContainer = styled.div`
	position: fixed;
	${(p) => setMultipleProperties(`${p.theme.spacing(2)}px`, ["right", "top"])}
`;

export const FloatingButton = styled.button`
	margin-left: ${(p) => p.theme.spacing(1)}px;
	color: white;
`;
