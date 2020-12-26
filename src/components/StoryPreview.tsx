import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
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

interface StoryProps {
	mongoUser: Realm.User | null;
}

export default function StoryPreview({ mongoUser }: StoryProps) {
	const [storyId, setStoryId] = useState();
	const [title, setTitle] = useState();
	const [storyText, setStoryText] = useState<string | string[]>();

	const getStory = useCallback(async (excludeId?) => {
		if (mongoUser !== null) {
			try {
				const story = await getRandomStory(mongoUser, excludeId);
                if (story === null) throw new Error("Couldn't find story");

				setStoryId(story._id.toString() || undefined);
				setTitle(story.title || "");

				const previewBody = grabPreview(story.body);
				setStoryText(previewBody || "");
			} catch (error) {
				console.log(error);
			}
		}
	}, [mongoUser]);

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
