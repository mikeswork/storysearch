import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";
import { getSpecificStory, getRandomStory } from "../util/getStories";
import { Link, useParams } from "react-router-dom";

interface StoryPreviewProps {
    mongoUser: Realm.User | null;
}

const Div = styled.div`
	position: relative;

	.buttons {
		position: absolute;
	}
`;

const getPreviewText = (full: string | string[]) => {
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

export default function StoryPreview({ mongoUser }: StoryPreviewProps) {
    const { docId } = useParams();

	const [storyId, setStoryId] = useState(undefined);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [storyText, setStoryText] = useState<string | string[]>("");

	const changeStory = useCallback(async () => {
		if (mongoUser !== null) {
			try {
				const story = docId ? await getSpecificStory(mongoUser, docId) : await getRandomStory(mongoUser);

				setStoryId(story._id || undefined);
				setTitle(story.title || "");
				setAuthor(story.author || "");

                const storyBody = getPreviewText(story.body);
                console.log(storyBody)
				setStoryText(storyBody || "");
			} catch (error) {
				console.log(error);
			}
		}
	}, [mongoUser, docId]);

	useEffect(() => {
		changeStory();
	}, [changeStory]);

	return (
		<Div>
			<div className="buttons">
				<button onClick={() => changeStory()}>Read a Different Story</button>

				<Link to={`/story/${storyId}`}>Read entire story.</Link>
			</div>

			<StoryView title={title} author={author} text={storyText} />
		</Div>
	);
}
