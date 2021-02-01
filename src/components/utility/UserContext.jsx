import React from "react";

/**
 * Context for storing user data
 *
 * @property {object} user The user object
 * @property {Function} setUser The state setter function to set the user object
 */
export default React.createContext({ user: null, setUser: null });
