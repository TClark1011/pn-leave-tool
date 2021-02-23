import styled from "styled-components";
import { flexWrapperMixin } from "./styles/config/mixins";
import { spacing } from "./styles/config/themeSelectors";

export const AppRoot = styled.div`
	${flexWrapperMixin({
		justify: "center",
		align: "center",
	})}
`;

export const ContentContainer = styled.div`
	padding: ${spacing(4)}px 0;
`;
