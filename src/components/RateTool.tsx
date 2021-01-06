import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ObjectId } from "bson";
import { RealmContext } from "../RealmApp";
import { getSpecificStory } from "../util/getStories";
import pensoutlined from "../assets/pens-outlined.png";
import pensfilled from "../assets/pens-filled.png";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
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

	.score, .thanks {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		justify-content: center;
		align-items: center;

		font-size: 1.5em;
		font-family: sans-serif;
		font-weight: bold;

		span {
			padding: 0.2em 0.4em;
			background-color: black;
		}
	}
	.score {
		display: flex;
		pointer-events: none;
	}
	.thanks {
		display: none;
		background-color: rgba(255, 255, 255, 0.75);
	}

	${(props) =>
		props.$voted &&
		`
            pointer-events: none;
            .thanks { display: flex; }
            .score { display: none; }
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

const getScoreFromE = (e) => {
	if (e.changedTouches) {
		// Touch event
		return Math.round(
			((e.changedTouches[0].clientX - e.target.offsetParent.offsetLeft) / e.target.clientWidth) * 10
		);

		// This formula worked before overall component position was set to relative in css:
		// Math.round(((e.changedTouches[0].clientX - e.target.offsetLeft) / e.target.clientWidth) * 10);
	} else {
		// Mouse event
		return Math.round((e.nativeEvent.layerX / e.target.clientWidth) * 10);

		// This formula worked before overall component position was set to relative in css:
		// Math.round(((e.clientX - e.target.offsetLeft) / e.target.clientWidth) * 10);
	}
};

export default function RateTool({ storyId }: { storyId: string }) {
    const { anonUser } = useContext(RealmContext);

	const [score, setScore] = useState<number>();
	const [clipPrcnt, setClipPrcnt] = useState<string>();
	const [isScored, setIsScored] = useState<boolean>();
	const [voteSubmitted, setVoteSubmitted] = useState<boolean>();

	// Reset component each time it loads a story
	React.useEffect(() => {
		setClipPrcnt("0%");
		setIsScored(false);

        // If localStorage isn't available, this fails to "false," which is fine for now:
        let alreadyVoted: boolean = window.localStorage && window.localStorage.getItem(storyId) ? true : false;
        
		setVoteSubmitted(alreadyVoted);
	}, [storyId]);

	const slideRating = (e) => {
		// console.log(e)
		if (!isScored) {
			// Score is 1 - 10
			setScore(getScoreFromE(e));
			// Convert score to percentage
			setClipPrcnt(`${(score || 0) * 10}%`);
		}
	};

	const toggleIsScored = (e) => setIsScored(!isScored);

	const endRating = () => {
		if (!isScored) {
			setScore(0);
			setClipPrcnt(`0%`);
		}
	};

	const touchRating = (e) => {
		e.preventDefault();

		// Score is 1 - 10
		setScore(getScoreFromE(e));

		// Convert score to percentage
		setClipPrcnt(`${(score || 0) * 10}%`);
		setIsScored(true);
	};

	const submitScore = async () => {
		try {
			if (score === undefined) throw new Error("Can't vote until score selected");

			if (anonUser === undefined) throw new Error("Not connected to db.");
			const { story, collection } = await getSpecificStory(anonUser, storyId, undefined, true);

			if (story === null) throw new Error("Couldn't find story.");
			if (story.acceptVotes !== true) throw new Error("Can't vote.");

			const votesSoFar = story.votes >= 0 ? story.votes : 0;
			const ratingSoFar = story.rating >= 0 ? story.rating : 0;
			const update = { $set: { votes: votesSoFar + 1, rating: ratingSoFar + score } };

			const result = await collection.updateOne({ _id: new ObjectId(storyId) }, update);
			if (result === null) throw new Error("Couldn't save vote.");

			if (window.localStorage) {
				if (window.localStorage.getItem(storyId)) {
					throw new Error("Already voted.");
				} else {
					window.localStorage.setItem(storyId, "voted");
				}
			}

			setVoteSubmitted(true);
			console.log("Vote counted!");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Wrapper $isScored={isScored} $voted={voteSubmitted}>
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

			<div className="score">{isScored && <span>Score: {(score || 0) / 2} out of 5</span>}</div>

			<div className="thanks">
				<span>Thank You For Voting!</span>
			</div>
		</Wrapper>
	);
}
