import { Icon } from "@material-ui/core";
import styled from "styled-components";

const gap = (p) => p.theme.spacing(2);

export const ProfileItemRoot = styled.div`
	width: 100%;
	min-width: 200px;

	margin-right: 0;
	margin-bottom: ${gap}px;

	@media only screen and (min-width: 550px) {
		width: var(--profile-item-width, calc(50% - ${(p) => gap(p) / 2}px));
	}

	.label {
		width: max-content;
		width: 100%;
	}
`;

export const ProfileItemIcon = styled(Icon)`
	margin-right: ${gap}px;
`;
