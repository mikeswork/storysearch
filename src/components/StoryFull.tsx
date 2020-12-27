import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";
import RateTool from "./RateTool";
import { getSpecificStory, getRandomStory } from "../util/getStories";
import { useLocation } from "react-router-dom";

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

export default function StoryFull({ mongoUser }: StoryProps) {
    // console.log("[StoryFull][render]");
    const locState = useLocation().state;
	const routedId = locState && locState.sId;

	const [storyId, setStoryId] = useState(routedId);
	const [title, setTitle] = useState();
    const [storyText, setStoryText] = useState();
    const [canRate, setCanRate] = useState();

	const getStory = useCallback(
		async (excludeId?) => {
			if (mongoUser !== null) {
				try {
					const story = excludeId
						? await getRandomStory(mongoUser, excludeId)
						: await getSpecificStory(mongoUser, routedId);

                    if (story === null) throw new Error("Couldn't find story");

					setStoryId(story._id.toString());
					setTitle(story.title || "");
                    setStoryText(story.body || "");
                    setCanRate(story.acceptVotes);
				} catch (error) {
					console.log(error);
				}
			}
		},
		[mongoUser, routedId]
	);

	useEffect(() => {
		getStory();
	}, [getStory]);

	return (
		<Div>
			{ canRate && <RateTool mongoUser={mongoUser} storyId={storyId} /> }

			<div className="buttons">
				<button onClick={() => getStory(storyId)}>Read a Different Story</button>
			</div>

			<StoryView title={title} text={storyText} />
		</Div>
	);
}
