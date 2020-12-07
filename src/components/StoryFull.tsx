import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";
import { getSpecificStory, getRandomStory} from "../util/getStories"; 
import { useParams, Redirect } from "react-router-dom";

interface StoryFullProps {
    mongoUser: Realm.User | null;
}

const Div = styled.div`
	position: relative;

	.buttons {
		position: absolute;
	}
`;

export default function StoryFull({mongoUser}: StoryFullProps) {
    const { docId } = useParams();

    const [storyId, setStoryId] = useState(undefined);
    const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
    const [storyText, setStoryText] = useState("");

	useEffect(() => {
		(async () => {
            if (mongoUser !== null) {
                try {
                    const story = await getSpecificStory(mongoUser, docId);
    
                    setTitle(story.title || "");
                    setAuthor(story.author || "");
                    setStoryText(story.body || "");
                } catch (error) {
                    console.log(error);
                }
            }
        })()
    }, [mongoUser, docId]);
    
    const changeStory = async() => {
        if (mongoUser !== null) {
			try {
                const story = await getRandomStory(mongoUser, {"_id": 1});
                setStoryId(story._id);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Div>
            {storyId && <Redirect to={`/story/${storyId}`}/>}

            <div className="buttons">
				<button onClick={() => changeStory()}>Read a Different Story</button>
			</div>

			<StoryView title={title} author={author} text={storyText} />
		</Div>
	);
}
