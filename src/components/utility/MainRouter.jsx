import { Card } from "@material-ui/core";
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

const MainRouter = ({ children }) => (
	<Router>
		<Switch>
			<Route path="/login">
				<Card className="centerV centerH card">
					<AuthForms form="login" />
				</Card>
			</Route>
			<Route path="/register" exact>
				<Card className="centerV centerH card">
					<AuthForms form="register" />
				</Card>
			</Route>
			<Route
				path="/register/confirm/:employee_number"
				component={({ match }) => (
					<Card className="centerV centerH card">
						<RegistrationConfirmation
							employee_number={match.params.employee_number}
						/>
					</Card>
				)}
			></Route>
			<AuthenticatedRoute path="/request">
				<Card
					className="centerV centerH card"
					style={{
						width: "400px",
					}}
				>
					<LeaveForm />
				</Card>
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
