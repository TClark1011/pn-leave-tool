import React from "react";

import {
	Redirect,
	Route,
	Switch,
	BrowserRouter as Router,
} from "react-router-dom";
import { getLandingRedir } from "../../constants/autoNavParams";
import SubmitLmsData from "../Admin/SubmitLmsData";
import AuthForms from "../AuthForms";
import ForgotPasswordForm from "../ForgotPasswordForm";
import HelpScreen from "../HelpScreen/HelpScreen";
import LeaveForm from "../LeaveForm";
import Profile from "../Profile";
import RegistrationConfirmation from "../RegistrationConfirmation";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import AuthenticatedRoute from "./AuthenticatedRoute";
import ContentCard from "./ContentCard";

const MainRouter = ({ children }) => (
	<Router>
		<Switch>
			<Route path="/login">
				<ContentCard>
					<AuthForms form="login" />
				</ContentCard>
			</Route>
			<Route path="/register" exact>
				<ContentCard>
					<AuthForms form="register" />
				</ContentCard>
			</Route>
			<Route
				path="/register/confirm/:employee_number"
				component={({ match }) => (
					<ContentCard>
						<RegistrationConfirmation
							employee_number={match.params.employee_number}
						/>
					</ContentCard>
				)}
			></Route>
			<AuthenticatedRoute path="/request">
				<ContentCard
					style={{
						width: "400px",
					}}
				>
					<LeaveForm />
				</ContentCard>
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/profile">
				<Profile />
			</AuthenticatedRoute>
			<Route path="/submitLmsData" component={SubmitLmsData} />
			<Route path="/forgotPassword" component={ForgotPasswordForm} />
			<Route
				path="/resetPassword/:resetKey"
				component={({ match }) => (
					<ResetPasswordForm resetKey={match.params.resetKey} />
				)}
			/>
			<Route path="/help" component={HelpScreen} />
			<Route path="/">
				<Redirect to={getLandingRedir()} />
			</Route>
		</Switch>
		{children}
	</Router>
);

export default MainRouter;
