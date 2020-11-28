import React from "react";
import styled from "styled-components";
import books from "../assets/books.jpg";
import Nav from "./Nav";

const Header = styled.header`
    ${props => props.theme.main}
    
    position: relative;
	width: 100%;
	height: 80vh;
	min-height: 350px;
	background-image: url(${books});
	background-size: cover;
    background-position: top center;

	.masthead-title {
        margin: 0 50px;
        
        h1 {
            text-transform: uppercase;
        }
	}

	.masthead-caption {
		margin: 0 50px 0 100px;
	}

	h1, h3 {
        display: inline-block;
        margin: 50px 0 0 0;
        text-shadow: 4px 4px 40px #000, 2px 2px 32px #000, 1px 1px 16px #000, 4px 4px 8px #000, 2px 2px 6px #000;
        font-size: 3.5em;
    }

    h3 {
        margin: 0;
        font-size: 2em;
    }
`;

export default function Masthead(props) {
	return (
		<Header>
			<div className="masthead-title">
				<h1>Story-Share</h1>
			</div>
			<div className="masthead-caption">
				<h3>Post your short stories. Others review them and the best ones make it to the top.</h3>
			</div>

            <Nav/>
		</Header>
	);
}
