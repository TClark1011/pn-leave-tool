# PN LEAVE TOOL

This is a tool designed to automate the approval of requests to take annual leave made by PN employees.

## RE-USEABLE COMPONENTS

The following custom re-useable components that appear throughout the project:

### General

- ContentCard - A generic card for displaying content on. It has a reasonable width and has a max-width to ensure appropriate scaling to mobile devices
- StatusMessage - Used to display server responses
- MuiTabPanel - To be used with Material-UI tabs. Only renders its children if the provided `value` and `index` props are equal.
- DebugSpan - A component that will only be displayed in a development environment. When built/testing it will not render.

### Typography

- SectionTitle - The title of a section/area of the app. Just Pass it the text content of the title as its child.
- BodyText - General purpose text component. Should be the default go-to component for displaying non-heading text.
- SupportEmailLink - A `mailto:` link for the support email address.

### Authentication

- AuthenticatedItem - A wrapper that only renders it's children if the current user is signed in.
- AuthenticatedRoute - A `react-router` `Route` component that will redirect unauthenticated users to the login screen. Makes use of `AuthenticatedItem`.

### Forms

- AboveFormContent - Content to be displayed above a form but underneath the title of the section.
- FormButton - Button to be used in forms.
- FormItem - General purpose form item.
- FormField - A field to be used in forms.

## ENVIRONMENT VARIABLES

The following environment variables are used to allow for settings in the application to be tweaked during deployment:

- NODE_ENV - The stock 'NODE_ENV' environment variable provided by CRA. Is set to 'development' during development, 'test' while testing and 'production' when building.
- REACT_APP_SUPPORT_EMAIL - The email address that users are told to contact for support
- REACT_APP_VALIDATE_EMAIL - Whether or not to validate user emails during registration. Expects "true" or "false". Defaults to true if not supplied.
- REACT_APP_BACKEND_DEV_PORT - The port to be used in localhost for the backend in development environment.
- REACT_APP_BACKEND_URL - The url for the backend. In development environment, this is overridden by localhost + REACT_APP_BACKEND_DEV_PORT.

## API REQUESTS

//TODO: Describe the different api requests that are used to fetch data
