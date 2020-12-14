import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";
import { getSpecificStory, getRandomStory } from "../util/getStories";
import { Link, useParams } from "react-router-dom";

const Div = styled.div`
	position: relative;

	.buttons {
		position: absolute;
	}
`;

const getIntroSlice = (full: string | string[]) => {
    let pText: string | string[];
    let pTextLength = 1000;
    let pTextTail = "...";

    if (typeof full === "string") {
        return full.slice(0, pTextLength) + pTextTail;
    } else {
        pText = [];

        for (let i = 0; i < full.length; i++) {
            if (pTextLength <= 0)
                break

            pText.push(full[i].slice(0, pTextLength));
            pTextLength -= pText[i].length;
        }

        pText[pText.length-1] += pTextTail;
        return pText;
    }
};

interface StoryPreviewProps {
    mongoUser: Realm.User | null;
}

export default function StoryPreview({ mongoUser }: StoryPreviewProps) {
    // docId (i.e. load StoryPreview with specific story via url) is currently disabled (i.e. route doesn't exist).
    const { docId } = useParams();

	const [storyId, setStoryId] = useState();
	const [title, setTitle] = useState();
	//const [author, setAuthor] = useState();
	const [storyText, setStoryText] = useState<string | string[]>();

	const changeStory = useCallback(async () => {
		if (mongoUser !== null) {
			try {
				const story = docId ? await getSpecificStory(mongoUser, docId) : await getRandomStory(mongoUser);

				setStoryId(story._id || undefined);
				setTitle(story.title || "");
				//setAuthor(story.author || "");

                const previewBody = getIntroSlice(story.body);
				setStoryText(previewBody || "");
			} catch (error) {
				console.log(error);
			}
		}
	}, [mongoUser, docId]);

	useEffect(() => {
		changeStory();
	}, [changeStory]);

	return (
		<Div data-testid="story-preview">
			<div className="buttons">
				<button onClick={() => changeStory()}>Read a Different Story</button>

				<Link to={`/story/${storyId}`}>Read entire story.</Link>
			</div>

			<StoryView isWide={true} title={title} text={storyText} />
		</Div>
	);
}
