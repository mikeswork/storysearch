import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { RealmContext } from "../RealmApp";
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

export default function StoryWinner(props) {
    const { docId } = useParams();
    
    const { anonUser } = useContext(RealmContext);

	const [title, setTitle] = useState();
	const [author, setAuthor] = useState();
	const [storyText, setStoryText] = useState<string | string[] | undefined>();

	useEffect(() => {
		if (anonUser !== undefined) {
			getSpecificStory(anonUser, docId)
				.then((story) => {
                    if (story === null) throw new Error("Couldn't find story");
                    
					setTitle(story.title || "");
                    setAuthor(story.author || "");
					setStoryText(story.body || "");
				})
				.catch((err) => {
                    setStoryText("Failed to load.");
                    console.log(err);
				});
		}
	}, [anonUser, docId]);

	return (
		<Div>
			<StoryView title={title} author={author} text={storyText} />
		</Div>
	);
}
