import Card from "@material-ui/core/Card";
import styled from "styled-components";
import { spacing } from "../../styles/config/themeSelectors";

export default styled(Card)`
	width: 700px;
	max-width: 95vw;
	padding: ${spacing(5)}px;
`;
