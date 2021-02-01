import styled from "styled-components";
import { spacing } from "../../../styles/config/themeSelectors";

/**
 * Generic form item. Has horizontal spacing between items.
 */
export default styled.div`
	& + & {
		margin-top: ${spacing(1)}px;
	}
`;
