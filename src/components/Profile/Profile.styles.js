import styled from "styled-components";
import SectionTitle from "../utility/SectionTitle";
import { flexWrapperMixin } from "../../styles/config/mixins";
import { Fab, IconButton } from "@material-ui/core";

export const ProfileRoot = styled.div`
	position: relative;
	${(p) => p.editMode && `--profile-item-width:100%`}
`;

export const ProfileTopWrapper = styled.div`
	${flexWrapperMixin({ justify: "space-between", align: "flex-start" })}
`;

export const ProfileSectionTitle = styled(SectionTitle)`
	padding-right: ${(p) => p.theme.spacing(1)}px;
`;

export const ProfileEditButton = styled(IconButton)`
	position: absolute;
	right: 0;
`;

export const ProfileFieldsContainer = styled.div`
	${flexWrapperMixin({ justify: "space-between", wrap: "wrap" })}
`;

export const ProfileExitButton = styled(Fab).attrs({
	variant: "extended",
	color: "primary",
})`
	width: 700px;
	max-width: 95vw;
	position: relative;
	top: ${(p) => p.theme.spacing(2)}px;
`;
