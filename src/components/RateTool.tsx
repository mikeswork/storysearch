import React, { useState, useRef } from "react";
import styled from "styled-components";
import pensoutlined from "../assets/pens-outlined.png";
import pensfilled from "../assets/pens-filled.png";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1em;
	background-color: white;

	.icons {
		background-image: url(${pensoutlined});
		background-repeat: no-repeat;
		background-position: 50%;
		opacity: 0.6;
	}

	${(props) =>
		props.$isScored &&
		`
            .icons {opacity: 1.0}
        `}
`;

const ClippedImg = styled.img`
	display: block;

	${(props) =>
		props.$clipRight &&
		`
            clip-path: polygon(0 0, ${props.$clipRight} 0, ${props.$clipRight} 100%, 0 100%);
        `}
`;

export default function RateTool(props) {
	const score = useRef<number>();
	const [clipPrcnt, setClipPrcnt] = useState("0%");
	const [isScored, setIsScored] = useState<boolean>();

	const slideRating = (e) => {
		// console.log(e)
		if (!isScored) {
			// Score is 1 - 10
			score.current = Math.round(((e.clientX - e.target.offsetLeft) / e.target.clientWidth) * 10);

			// Convert score to percentage
			setClipPrcnt(`${score.current * 10}%`);
		}
	};

	const toggleIsScored = (e) => {
		setIsScored(!isScored);
		console.log(e);
	};

	const endRating = () => {
		if (!isScored) {
			score.current = 0;
			setClipPrcnt(`0%`);
		}
	};

	const touchRating = (e) => {
		e.preventDefault();

		// Score is 1 - 10
		score.current = Math.round(((e.changedTouches[0].clientX - e.target.offsetLeft) / e.target.clientWidth) * 10);

		// Convert score to percentage
		setClipPrcnt(`${score.current * 10}%`);
		setIsScored(true);
	};

	const submitScore = () => {
		console.error(`Need to implement submitting of score (current is ${score.current})`);
	};

	return (
		<Wrapper $isScored={isScored}>
			<div
				className="icons"
				onMouseMove={slideRating}
				onClick={toggleIsScored}
				onMouseLeave={endRating}
				onTouchEnd={touchRating}
			>
				<ClippedImg src={pensfilled} alt="Rate the story" $clipRight={clipPrcnt} />
			</div>

			<button onClick={submitScore} disabled={!isScored}>
				Submit Score
			</button>
		</Wrapper>
	);
}
