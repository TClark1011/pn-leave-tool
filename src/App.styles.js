import styled from "styled-components";
import { FlexWrapperMixin } from "./styles/config/mixins";
import { bottomNavHeight } from "./styles/config/styleVars";

export const AppRoot = styled.div`
	${FlexWrapperMixin({ justify: "center", align: "center" })}
	padding-bottom:${(p) => p.theme.spacing(4) + bottomNavHeight}px;
`;

export const ContentContainer = styled.div`
	padding: ${(p) => p.theme.spacing(4)}px;
`;
