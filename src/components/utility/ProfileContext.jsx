import { createContext } from "react";

/**
 * The context containing information about the profile
 *
 * @property {Boolean} editMode Whether or not 'editMode' is currently enabled
 */
export default createContext({ editMode: null });
