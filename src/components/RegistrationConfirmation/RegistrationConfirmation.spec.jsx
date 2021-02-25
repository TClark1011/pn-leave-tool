import { screen } from "@testing-library/react";
import { getTestFn } from "../../utils/testUtils";
import RegistrationConfirmation, {
	regConfirmSectionTitle,
	regConfirmDescription,
} from "./RegistrationConfirmation";

const regConfirmTest = getTestFn(RegistrationConfirmation);

describe("Elements render correctly", () => {
	test(
		"Section title",
		regConfirmTest(() => {
			expect(screen.getByText(regConfirmSectionTitle)).toBeInTheDocument();
		}),
	);

	test(
		"Instructions",
		regConfirmTest(() => {
			expect(screen.getByText(regConfirmDescription)).toBeInTheDocument();
		}),
	);

	test(
		"Action buttons",
		regConfirmTest(() => {
			expect(screen.getByText("return to login")).toBeInTheDocument();
			expect(screen.getByText("Resend Email")).toBeInTheDocument();
		}),
	);
});
