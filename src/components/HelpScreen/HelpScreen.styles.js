import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const HelpScreenSubheader = styled(Typography).attrs({
	variant: "h3",
})`
	font-size: 24px;
	font-weight: 500;
	margin-top: ${(p) => p.theme.spacing(2)};
`;
