import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { RealmContext } from "../RealmApp";
import StoryView from "./StoryView";
import RateTool from "./RateTool";
import Button from "./Button";
import { getSpecificStory, getRandomStory } from "../util/getStories";
import { useLocation } from "react-router-dom";

const Section = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;

	
`;

export default function StoryFull() {
    // console.log("[StoryFull][render]");
    const locState = useLocation().state;
    const routedId = locState && locState.sId;
    
    const { anonUser } = useContext(RealmContext);

	const [storyId, setStoryId] = useState(routedId);
	const [title, setTitle] = useState();
    const [storyText, setStoryText] = useState();
    const [canRate, setCanRate] = useState();

	const getStory = useCallback(
		async (excludeId?) => {
			if (anonUser !== undefined) {
				try {
					const story = excludeId
						? await getRandomStory(anonUser, excludeId)
						: await getSpecificStory(anonUser, routedId);

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
		[anonUser, routedId]
	);

	useEffect(() => {
		getStory();
	}, [getStory]);

	return (
		<Section>
			<StoryView title={title} text={storyText} />

            { canRate && <RateTool storyId={storyId} /> }

            <Button onClick={() => getStory(storyId)} text="Read a Different Story"/>
		</Section>
	);
}
