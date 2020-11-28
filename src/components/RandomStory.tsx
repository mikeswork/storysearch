import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StoryView from "./StoryView";

// const Div = styled.div`
	
// `;

function getRandoStory() {
    return Promise.resolve({title: "The Entrusting", author: "Michael Richardson", storyText: "Once upon a time..."});
}

export default function RandomStory(props) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [storyText, setStoryText] = useState("");
    
    useEffect(() => {
        getRandoStory().then((story) => {
            setTitle(story.title);
            setAuthor(story.author);
            setStoryText(story.storyText);
        })
    }, []);

	return (
        <StoryView title={title} author={author} text={storyText} />
	);
}
