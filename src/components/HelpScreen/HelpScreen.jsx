import "./HelpScreen.scss";
import { Link, Typography } from "@material-ui/core";
import React from "react";
import BodyText from "../utility/BodyText";
import SectionTitle from "../utility/SectionTitle";
import ContentCard from "../utility/ContentCard/ContentCard";
import classnames from "classnames";
import SupportEmailLink from "../utility/SupportEmailLink";
import setDocTitle from "../../utils/setDocTitle";

function HelpScreen({ ...props }) {
	setDocTitle("Help");

	function Subheader({ children, className, ...props }) {
		return (
			<Typography
				className={classnames("HelpScreen__Subheader", className)}
				variant="h3"
			>
				{children}
			</Typography>
		);
	}

	return (
		<ContentCard {...props}>
			<SectionTitle>Help</SectionTitle>
			<BodyText>
				If you are having a problem and need help, you can contact the developer
				of this tool at <SupportEmailLink />. When requesting assistance, it is
				extremely helpful to provide as much information about your situation as
				possible, the more we know about your problem, the faster we can fix it.
			</BodyText>
			<br />
			<BodyText>
				Before you can use this tool, you must an account using your pacific
				national employee number and email address. This tool does not allow you
				to sign in with any accounts for other pacific national websites or
				apps, you must <Link href="/register">register</Link> a new account on
				this tool.
			</BodyText>
			<SectionTitle>FAQ</SectionTitle>
			<Subheader>What is this?</Subheader>
			<BodyText>
				This is a tool that was developed to allow Pacific National employees to
				get an estimate as to whether or not annual leave is likely to be
				approved or not before beginning the official process of requesting the
				annual leave.
			</BodyText>
			<br />
			<BodyText>
				Please note the verdict of this tool is only an estimate and is not a
				guarantee, just because this tool estimates a certain period of time is
				available for leave does not mean you can be certain that your official
				request for leave will also be approved.
			</BodyText>

			<Subheader>Why do I have to make a new account?</Subheader>
			<BodyText>
				This tool is not integrated into any official Pacific National systems
				and as such is unable to to use any other Pacific National accounts in
				the login process.
			</BodyText>
		</ContentCard>
	);
}

export default HelpScreen;