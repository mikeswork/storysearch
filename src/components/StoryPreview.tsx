import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";
import getRandomStory from "../util/getRandomStory";

interface StoryPreviewProps {
	mongoUser: Realm.User | null;
}

const Div = styled.div`
	position: relative;

	.buttons {
		position: absolute;
	}
`;

export default function StoryPreview(props: StoryPreviewProps) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [storyText, setStoryText] = useState("");

	const changeStory = useCallback(async () => {
		if (props.mongoUser !== null) {
			try {
				const story = await getRandomStory(props.mongoUser);

				setTitle(story.title || "");
				setAuthor(story.author || "");
				setStoryText(story.body || "");
			} catch (error) {
				console.log(error);
			}
		}
	}, [props.mongoUser]);

	useEffect(() => {
		changeStory();
	}, [changeStory]);

	return (
		<Div>
			<div className="buttons">
                <button onClick={() => changeStory()}>Reload</button>
                <button>Read entire story</button>
            </div>

			<StoryView title={title} author={author} text={storyText} />
		</Div>
	);
}
