import React from "react";
import styled from "styled-components";

const View = styled.div`
    background-color: #eee;
    color: #111;
    font-family: sans-serif;

    h2, h3 {
        text-align: center;
    }
	p {
		min-height: 1em;
		margin: 1em 0;
		text-indent: 2em;
		line-height: 1.75em;
	}
`;

interface StoryViewProps {
	title?: string;
	author?: string;
	text: string | string[];
}

export default function StoryView({ text = "", ...props }: StoryViewProps) {
	let parId = 0;
    
    // Check if passed the entire text or an array of separate paragraphs into component
    let paragraphs = (typeof text === "object") ? text : text.split(/\n/);

	return (
		<View>
			<h2>{props.title}</h2>

			{props.author && <h3>by {props.author}</h3>}

			{paragraphs.map((par) => (
				<p className="story-para" key={parId++}>
					{par}
				</p>
			))}
		</View>
	);
}
