# PN LEAVE TOOL

This is a tool designed to automate the approval of requests to take annual leave made by PN employees.

## RE-USEABLE COMPONENTS

The following custom re-useable components that appear throughout the project:

- SectionTitle - The title of a section/area of the app. Just Pass it the text content of the title as its child.
- Content Card - A generic card for displaying content on. It has a reasonable width and has a max-width to ensure appropriate scaling to mobile devices
- Status Message - Used to display server responses

## ENVIRONMENT VARIABLES

The following environment variables are used to allow for settings in the application to be tweaked during deployment:

- REACT_APP_SUPPORT_EMAIL - The email address that users are told to contact for support
- REACT_APP_VALIDATE_EMAIL - Whether or not to validate user emails during registration. Expects "true" or "false". Defaults to true if not supplied

## API REQUESTS

//TODO: Describe the different api requests that are used to fetch data
