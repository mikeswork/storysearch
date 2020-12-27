import React, { useReducer } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";

interface StoryProps {
	mongoUser: Realm.User | null;
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const fields = {
	title: "Story Title",
	author: "Author Name or Pen name",
	storyText: "Paste your story here...",
};

// Set an empty string for the default value of each field
let initState = {};
Object.keys(fields).forEach((key) => (initState[key] = ""));

export default function StoryForm(props: StoryProps) {
	const formReducer = (prevState, action) => {
		// console.log("[formReducer]", action);

		if (action === "reset") return initState;

		return { ...prevState, [action[0]]: action[1] };
	};

	const [state, dispatch] = useReducer(formReducer, initState);
	// console.log(JSON.stringify(state.storyText))

	const submitForm = async (e) => {
		console.log("[submitForm]");
		e.preventDefault();

		try {
			if (!props.mongoUser) throw new Error("Not logged in.");

			const mongodb = props.mongoUser.mongoClient("mongodb-atlas");
			const stories = mongodb.db("content").collection("stories");

			// Saving paragraphs separately produces cleaner data.
			const paragraphs = state.storyText.split(/\n/); // (/\n {4,}| {4,}|\t|\n\t|\n/);

			let storyDoc = {
				title: state.title,
				author: state.author,
				dateAdded: new Date(),
				viewed: false,
				approved: false,
				body: paragraphs,
			};

            await stories.insertOne(storyDoc);
            alert("Thank you!");
			dispatch("reset");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Form onSubmit={submitForm}>
				<input
					type="text"
					disabled={!props.mongoUser}
					required={true}
					placeholder={fields.title}
					value={state.title}
					onChange={({ target: { value } }) => dispatch(["title", value])}
				/>
				<input
					type="text"
					disabled={!props.mongoUser}
					required={true}
					placeholder={fields.author}
					value={state.author}
					onChange={({ target: { value } }) => dispatch(["author", value])}
				/>
				<textarea
					disabled={!props.mongoUser}
					required={true}
					rows={25}
					cols={75}
					placeholder={fields.storyText}
					value={state.storyText}
					onChange={({ target: { value } }) => dispatch(["storyText", value])}
				></textarea>

				<input type="submit" disabled={!props.mongoUser}></input>
			</Form>

			<StoryView title={state.title} author={state.author} text={state.storyText.split(/\n/)} />
		</div>
	);
}
