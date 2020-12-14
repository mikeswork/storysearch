import React from "react";
import styled from "styled-components";

const WideView = styled.div`
    background-color: #eee;
    color: #111;
    font-family: sans-serif;
    padding: 1em;

    h2, h3 {
        text-align: center;
    }
	p {
		min-height: 1em;
		margin: 0.6em 0;
		text-indent: 2em;
		line-height: 1.75em;
	}
`;

const NarrowView = styled(WideView)`
    max-width: 1200px;
`;

interface StoryViewProps {
	title: string | undefined;
	author?: string | undefined;
    text: string | string[] | undefined;
    isWide?: boolean;
}

export default function StoryView({ text, isWide = false, ...props }: StoryViewProps) {
    let parId = 0;
    
    const View = isWide ? WideView : NarrowView;

    let paragraphs: string[] = [];

    // Check if passed the entire text or an array of separate paragraphs into component
    if (text) paragraphs = (typeof text === "object") ? text : text.split(/\n/);

	return (
		<View>
			{props.title && <h2>{props.title}</h2>}

			{props.author && <h3>by {props.author}</h3>}

			{paragraphs.map((par) => (
				<p className="story-para" key={parId++} data-testid="story-para">
					{par}
				</p>
			))}
		</View>
	);
}
