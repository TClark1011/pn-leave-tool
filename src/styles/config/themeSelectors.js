/**
 * This file contains function generators for pulling values
 * out of a provided 'styled-components' theme with nice syntax
 */

import nestedProperty from "nested-property";

export const spacing = (value) => (props) => props.theme.spacing(value);

export const color = (value) => (props) =>
	nestedProperty.get(props.theme.palette, value);
