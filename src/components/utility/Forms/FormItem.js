import styled from "styled-components";
import { spacing } from "../../../styles/config/themeSelectors";

export default styled.div`
	& + & {
		margin-top: ${spacing(1)}px;
	}
`;
