# PN Leave Tool

This is a tool designed to provide an estimation of the likelihood of a request for annual leave over a specified period of time being approved/denied.

## Quick Start

This section details how to contribute/start working on this project:

1. Make sure you have a recent version Node.js installed ([link](https://nodejs.org/en/)).
1. Clone this repository along with the repository for the backend server code with the following terminal commands:

   **Frontend:** `git clone https://github.com/TClark1011/pn-leave-tool.git`<br>
   **Backend:** `git clone https://github.com/TClark1011/pn-leave-tool-backend.git`<br>
   <!-- REPO URLS: Make sure to update this section if the name/ownership of the repos are ever changed. -->

   It's possible you will get an error when running this command that states that the repositories do not exist. The most likely cause of this error is that either the repositories have changed name or ownership, or you are not authenticated.

1. Run the `npm install` command in both projects
1. Create the required environment variables in a `.env` file in the root directory of each project. What environment variables are required are described in the readme of each project.
1. You can now begin work on the project. To start the applications, run the command `npm run start:dev` in both projects. Other available scripts are described in the [scripts](#scripts) section of this readme file.

## Packages

This project is split into 3 seperate packages/repositories:

- **[Frontend](https://github.com/TClark1011/pn-leave-tool):** Frontend web application
- **[Backend](https://github.com/TClark1011/pn-leave-tool-backend):** Backend web server.
- **[Common](https://github.com/TClark1011/pn-leave-tool-common):** Common code components that are used in both the frontend and backend codebases. Contains logic for form validation and parameters for estimating annual leave such as minimum required notice and minimum/maximum leave length.
<!-- REPO URLS: Make sure to update this section if the name/ownership of the repos are ever changed. -->

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

## Styling

This application uses the [Material UI](https://material-ui.com/) component library for React as well as the [Styled Components](https://styled-components.com/) library for writing css styles.

## Api Requests

This section outlines the api requests that are made by this application during runtime. The [Axios](https://www.npmjs.com/package/axios) library is used to make http requests to the backend server. All request logic is contained in the files in the `src/services` folder.

### Authentication

Authentication related requests are found in the `src/services/auth.js` file.

- `login` - Send user provided credentials to server in order to log the user in.
- `register` - Send user provided details to server to register a new account.
- `resendVerification` - Request to resend the email used to verify a user's account following registration form submission.

### User

User related requests are found in the `src/services/user.js` file.

- `updateUser` - Update a user's account details. Currently the only details that can be edited are `name` and `depot`. Used when user edits their profile from the profile screen.
- `forgotPassword` - Submit request to begin the password update/reset process.
- `resetPassword` - Submit user's desired new password to complete the password reset process.

### Depots

Depot related requests are found in the `src/services/depot.js` file.

- `getDepots` - Fetch list of depots. Used in the 'DepotSelect` component.

### Leave

Leave related requests are found in the `src/services/leave.js` file.

- `submitLeave` - Submit a request for annual leave
- `getLeave` - Fetch a user's leave. (Is not used in current version)

### Admin

Admin related requests are found in the `src/services/admin.js` file.

- `submitLmsData` - Submit csv data from LMS data that has been converted to json format to update roster data that will be used to estimate leave approval likelihood.

## Environment Variables

The following environment variables are used to allow for settings in the application to be tweaked during deployment:

- NODE_ENV - The stock 'NODE_ENV' environment variable provided by CRA. Is set to 'development' during development, 'test' while testing and 'production' when building.
- REACT_APP_SUPPORT_EMAIL - The email address that users are told to contact for support
- REACT_APP_VALIDATE_EMAIL - Whether or not to validate user emails during registration. Expects "true" or "false". Defaults to true if not supplied.
- REACT_APP_BACKEND_DEV_PORT - The port to be used in localhost for the backend in development environment.
- REACT_APP_BACKEND_URL - The url for the backend. In development environment, this is overridden by localhost + REACT_APP_BACKEND_DEV_PORT.

## Misc

- When installing/uninstalling 'npm packages' in this project, you may get a warning of a 'high severity vulnerability' originating from the `object-path` package which is used by `react-scripts`. As described [here](https://github.com/facebook/create-react-app/issues/9842#issuecomment-712776748) this reported vulnerability does not affect projects that were created via 'Create React App' which this project was, so this vulnerability is a false positive for us.
