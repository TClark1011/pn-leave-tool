import styled from "styled-components";

export const DebugSpanEl = styled.span`
	margin-left: ${(p) => (p.preSpacing ? "1rem" : "0")};
	margin-right: ${(p) => (p.postSpacing ? "1rem" : "0")};
	font-style: ${(p) => (p.italics ? "italic" : "none")};
`;
