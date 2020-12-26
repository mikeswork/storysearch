import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";
import { getSpecificStory } from "../util/getStories";
import { useParams } from "react-router-dom";

const Div = styled.div`
	position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

	.buttons {
		position: absolute;
	}
`;

interface StoryProps {
	mongoUser: Realm.User | null;
}

export default function StoryWinner({ mongoUser }: StoryProps) {
	const { docId } = useParams();

	const [title, setTitle] = useState();
	const [author, setAuthor] = useState();
	const [storyText, setStoryText] = useState();

	useEffect(() => {
		if (mongoUser !== null) {
			getSpecificStory(mongoUser, docId)
				.then((story) => {
					setTitle(story.title || "");
					setAuthor(story.author || "");
					setStoryText(story.body || "");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [mongoUser, docId]);

	return (
		<Div>
			<StoryView title={title} author={author} text={storyText} />
		</Div>
	);
}