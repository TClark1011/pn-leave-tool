import styled from "styled-components";
import { flexWrapperMixin } from "./styles/config/mixins";
import { bottomNavHeight } from "./styles/config/styleVars";
import { spacing } from "./styles/config/themeSelectors";

export const AppRoot = styled.div`
	${flexWrapperMixin({ justify: "center", align: "center" })}
	padding-bottom:${(p) => p.theme.spacing(4) + bottomNavHeight}px;
`;

export const ContentContainer = styled.div`
	padding: ${spacing(4)}px;
`;
