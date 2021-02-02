import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import * as Realm from "realm-web";

// jest.mock("realm-web", () => {
// 	return {
// 		Credentials: { anonymous: () => true },
// 		App: function () {
// 			return {
// 				logIn: () => Promise.resolve(),
// 			};
// 		},
// 	};
// });

test("renders App", async () => {
	render(<App />);
	const mastElement = screen.getByText(/Story-Share/i);
	expect(mastElement).toBeInTheDocument();

	const storyPreview = screen.getByTestId("story-preview");
	expect(storyPreview).toBeInTheDocument();

	const email = await screen.findByPlaceholderText(/email/i);
	//   fireEvent.change(email, { target: {value: "asdfasdf"} })
	userEvent.type(email, "Sup");

	//   const test = screen.getByRole("");

	//   const els = await screen.findAllByTestId("story-para")
	screen.debug();
});
