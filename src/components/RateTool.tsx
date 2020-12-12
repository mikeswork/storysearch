import React, { useState } from "react";
import styled from "styled-components";
import pensoutlined from "../assets/pens-outlined.png";
import pensfilled from "../assets/pens-filled.png";

const rateIncrSize = 30;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 1em;
    background-image: url(${pensoutlined});
    background-repeat: no-repeat;
    background-position: 50%;

    background-color: white;
    ${(props) =>
        props.$ratingLocked && `background-color: #bbb;`
    }
`;

const ClippedImg = styled.img`
    display: block;

    ${(props) => 
        props.$clipRight &&
        `
            clip-path: polygon(0 0, ${props.$clipRight}px 0, ${props.$clipRight}px 100%, 0 100%);
        `
    }
`;

export default function RateTool(props) {
    const [mouseX, setMouseX] = useState(0);
    const [rateLocked, setRateLocked] = useState<boolean>();

    const slideRating = (e) => {
        // console.log(e)
        if (!rateLocked) {
            const newMouseX = e.clientX - e.target.offsetLeft;
            const width = e.target.clientWidth;

            if (newMouseX + rateIncrSize >= width) setMouseX(width)
            else if (newMouseX - rateIncrSize < 0) setMouseX(1)
            else if (Math.abs(newMouseX - mouseX) >= rateIncrSize) setMouseX(newMouseX)
        }
    }

    const toggleRating = () => setRateLocked(!rateLocked);

    return (
        <Wrapper $ratingLocked={rateLocked}>
            <div onMouseMove={slideRating} onClick={toggleRating}>
                <ClippedImg src={pensfilled} alt="Rate the story" $clipRight={mouseX} />
            </div>
        </Wrapper>
    )
}