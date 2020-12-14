import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";
import { getSpecificStory, getRandomStory } from "../util/getStories";
import { useParams, Redirect } from "react-router-dom";

const Div = styled.div`
	position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

	.buttons {
		position: absolute;
	}
`;

interface StoryFullProps {
	mongoUser: Realm.User | null;
}

export default function StoryFull({ mongoUser }: StoryFullProps) {
	const { docId } = useParams();

	const [storyId, setStoryId] = useState(undefined);
	const [title, setTitle] = useState();
	//const [author, setAuthor] = useState();
	const [storyText, setStoryText] = useState();

	useEffect(() => {
		if (mongoUser !== null) {
			getSpecificStory(mongoUser, docId)
				.then((story) => {
					setTitle(story.title || "");
					//setAuthor(story.author || "");
					setStoryText(story.body || "");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [mongoUser, docId]);

	const changeStory = async () => {
		if (mongoUser !== null) {
			try {
				const story = await getRandomStory(mongoUser, { _id: 1 });
				setStoryId(story._id);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Div>
			{storyId && <Redirect to={`/story/${storyId}`} />}

			<div className="buttons">
				<button onClick={() => changeStory()}>Read a Different Story</button>
			</div>

			<StoryView title={title} text={storyText} />
		</Div>
	);
}
