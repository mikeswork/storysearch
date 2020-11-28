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
	text: string;
}

export default function StoryView({ text = "", ...props }: StoryViewProps) {
	let parId = 0;
    
    //                         (/\n {4,}| {4,}|\t|\n\t|\n/);
	let paragraphs = text.split(/\n/);

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
