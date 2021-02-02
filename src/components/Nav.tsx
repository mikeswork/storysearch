import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.nav`
    position: absolute;
    right: 30px;
    bottom: 30px;
`;

export default function Nav(props) {
	return (
		<Wrapper> 
			<Button route="#story-preview" size="large" text="Read &amp; Judge"/>
			<Button route="#winners" size="large" text="Winners"/>
			<Button route="#story-form" size="large" text="Post"/>
			<Button route="#contact" size="large" text="Feedback / Contact"/>
		</Wrapper>
	);
}
