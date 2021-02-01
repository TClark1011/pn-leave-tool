import { Typography } from "@material-ui/core";
import styled from "styled-components";

/**
 * A component for displaying the title of a section
 * of the application
 */
export default styled(Typography).attrs({
	component: "h2",
	variant: "h2",
})`
	margin-bottom: ${(p) => p.theme.spacing(2)}px;
`;
