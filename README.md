# PN Leave Tool

This is a tool designed to provide an estimation of the likelihood of a request for annual leave over a specified period of time being approved/denied.

## Scripts

The following scripts can be executed within the project:

- `start` - The script used to run the project in production.
- `start:dev` - Uses the `react-scripts` start commanded that comes bundled in with 'Create-React-App' to start the program in watch mode (meaning the application will restart when any changes are made). Should be used to start the application in development. **NOTE:** The application must be manually shutdown and restarted before it will detect newly created environment variables.
- `build` - Build the program (goes into the 'build' folder).
- `test` - Run the 'test' script that comes bundled in with 'Create-React-App' to test the application.
- `update-common` - Install the latest version of the `pn-leave-tool-common` npm package.

## Re-Useable Components

The following components are design to be able to be re-used in different contexts throughout the application.

### General

- ContentCard - A generic card for displaying content on. It has a reasonable width for desktop screens and a max-width to ensure it scales to mobile screens appropriately.
- StatusMessage - Used to display server responses/error messages.
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

## Environment Variables

The following environment variables are used to allow for settings in the application to be tweaked during deployment:

- NODE_ENV - The stock 'NODE_ENV' environment variable provided by CRA. Is set to 'development' during development, 'test' while testing and 'production' when building.
- REACT_APP_SUPPORT_EMAIL - The email address that users are told to contact for support
- REACT_APP_VALIDATE_EMAIL - Whether or not to validate user emails during registration. Expects "true" or "false". Defaults to true if not supplied.
- REACT_APP_BACKEND_DEV_PORT - The port to be used in localhost for the backend in development environment.
- REACT_APP_BACKEND_URL - The url for the backend. In development environment, this is overridden by localhost + REACT_APP_BACKEND_DEV_PORT.
