import { Card, Fab } from "@material-ui/core";
import React from "react";

import {
	Redirect,
	Route,
	Switch,
	BrowserRouter as Router,
	Link,
} from "react-router-dom";
import { landingRedir } from "../../constants/autoNavParams";
import SubmitLmsData from "../Admin/SubmitLmsData";
import AuthForms from "../AuthForms";
import LeaveForm from "../LeaveForm";
import Profile from "../Profile";
import AuthenticatedRoute from "./AuthenticatedRoute";

const MainRouter = ({ children }) => (
	<Router>
		<Switch>
			<Route path="/login">
				<Card className="centerV centerH card">
					<AuthForms form="login" />
				</Card>
			</Route>
			<Route path="/register">
				<Card className="centerV centerH card">
					<AuthForms form="register" />
				</Card>
			</Route>
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
				<Card className="centerV centerH card">
					<Profile />
				</Card>
			</AuthenticatedRoute>
			<Route path="/submitLmsData" component={SubmitLmsData} />
			<Route path="/">
				<Redirect to={landingRedir} />
			</Route>
		</Switch>
		{children}
	</Router>
);

export default MainRouter;
