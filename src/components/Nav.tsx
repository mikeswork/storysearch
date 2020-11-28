import React from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
    position: absolute;
    right: 30px;
    bottom: 30px;

	a {
        position: relative;
		display: block;
		margin: 0 0 20px 0;
		border-radius: 10px;
		padding: 3px 93px 3px 38px;
		color: #000;
		text-decoration: none;
		font-weight: bold;
		font-size: 1.25em;
		background-color: #ffffeeff;
		transition: all 0.15s, transform 0.05s;
        transition-timing-function: ease-out;
        text-shadow: 0 0 4px #00000090;
    }

    a:before, a:after {
        content: "";
        position: absolute;
        transition: all 0.15s;
    }
    
    a:before {
        left: -5px;
        right: -5px;
        top: -5px;
        bottom: -5px;
        border: 12px solid black;
        border-radius: 10px;
    }
    a:after {
        left: 6px;
        right: 6px;
        top: 2px;
        bottom: 2px;
        border: 5px solid #ffffeeff;
        border-radius: 7px;
    }

	a:hover {
        transform: perspective(500px) translate3d(-5px, 0, 30px);
        background-color: black;

        &:after {
            border-color: black;
        }

        color: white;
	}

	a:active {
		background-color: rgba(0, 0, 0, 0.85);
		color: var(--link-click-color);
	}
`;

export default function Nav(props) {
	return (
		<Wrapper>
			<a href="#readjudge">Read &amp; Judge</a>
			<a href="#winners">Winners</a>
			<a href="#post">Post</a>
			<a href="#contact">Feedback / Contact</a>
		</Wrapper>
	);
}
