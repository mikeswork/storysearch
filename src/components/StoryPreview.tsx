import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { RealmContext } from "../RealmApp";
import StoryView from "./StoryView";
import { getRandomStory } from "../util/getStories";
import { Link } from "react-router-dom";

const Div = styled.div`
	position: relative;

	.buttons {
		position: absolute;
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
			}
		}
	}, [anonUser]);

	useEffect(() => {
		getStory();
	}, [getStory]);

	return (
		<Div data-testid="story-preview">
			<div className="buttons">
				<button onClick={() => getStory(storyId)}>Read a Different Story</button>

				<Link to={{ pathname: "/story", state: { sId: storyId } }}>Read entire story.</Link>
			</div>

			<StoryView isWide={true} title={title} text={storyText} />
		</Div>
	);
}
