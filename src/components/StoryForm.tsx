import React, { useReducer } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";

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

export default function StoryForm(props) {
	const formReducer = (prevState, action) => {
        // console.log("[formReducer]", action);
		return { ...prevState, [action[0]]: action[1] };
	};

	const [state, dispatch] = useReducer(formReducer, initState);
	// console.log("current state set by reducer:", state);

	const submitForm = (e) => {
        console.log("[submitForm]");
        e.preventDefault();
    };

	return (
		<div>
			<Form onSubmit={submitForm}>
				<input
					type="text"
					placeholder={fields.title}
					value={state.title}
					onChange={({ target: { value } }) => dispatch(["title", value])}
				/>
				<input
					type="text"
					placeholder={fields.author}
					value={state.author}
					onChange={({ target: { value } }) => dispatch(["author", value])}
				/>
				<textarea
					rows={25}
					cols={75}
					placeholder={fields.storyText}
					value={state.storyText}
					onChange={({ target: { value } }) => dispatch(["storyText", value])}
				></textarea>

				<input type="submit"></input>
			</Form>

			<StoryView title={state.title} author={state.author} text={state.storyText} />
		</div>
	);
}
