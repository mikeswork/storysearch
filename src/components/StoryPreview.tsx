import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { RealmContext } from "../RealmApp";
import StoryView from "./StoryView";
import Button from "./Button";
import { getRandomStory } from "../util/getStories";


const Section = styled.section`
    ${props => props.$loading && props.theme.loading}
    ${props => props.theme.lightBg}

    .buttons {
        display: flex;
        justify-content: space-evenly;
	}
`;

const grabPreview = (full: string | string[]) => {
	let pText: string | string[];
	let pTextLength = 1000;
	let pTextTail = "...";

	if (typeof full === "string") {
		return full.slice(0, pTextLength) + pTextTail;
	} else {
		pText = [];

		for (let i = 0; i < full.length; i++) {
			if (pTextLength <= 0) break;

			pText.push(full[i].slice(0, pTextLength));
			pTextLength -= pText[i].length;
		}

		pText[pText.length - 1] += pTextTail;
		return pText;
	}
};

export default function StoryPreview() {
    const { anonUser } = useContext(RealmContext);

	const [storyId, setStoryId] = useState();
	const [title, setTitle] = useState();
    const [storyText, setStoryText] = useState<string | string[] | undefined>();
    const [isLoading, setIsLoading] = useState(true);

	const getStory = useCallback(async (excludeId?) => {
		if (anonUser !== undefined) {
			try {
                const story = await getRandomStory(anonUser, excludeId);
                
                if (story === null) throw new Error("Couldn't find story");

				setStoryId(story._id.toString() || undefined);
				setTitle(story.title || "");

				const previewBody = grabPreview(story.body);
				setStoryText(previewBody || "");
			} catch (error) {
                setStoryText("Failed to load.");
				console.log(error);
			} finally {
                setIsLoading(false);
            }
		}
	}, [anonUser]);

	useEffect(() => {
		getStory();
    }, [getStory]);
    
    const loadNewStory = () => {
        if (isLoading) return;

        setIsLoading(true);
        getStory(storyId);
    }

	return (
		<Section data-testid="story-preview" id="story-preview" $loading={isLoading}>
			<StoryView isWide={true} title={title} text={storyText} />

            <div className="buttons">
                <Button route={{ pathname: "/story", state: { sId: storyId } }} text="Read entire story" disabled={isLoading}/>
				<Button onClick={loadNewStory} text="Preview a Different Story" disabled={isLoading} />
			</div>
		</Section>
	);
}
