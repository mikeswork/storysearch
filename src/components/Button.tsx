import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

const Wrapper = styled.div`
	a {
		position: relative;
		display: block;
		margin: 0 0 20px 0;
		border-radius: 10px;

		${({ $size }) => $size === "medium" && `padding: 3px 38px 3px 38px;`};
		${({ $size }) => $size === "large" && `padding: 3px 93px 3px 38px;`};

		color: #000;
		text-decoration: none;
		font-weight: bold;
		text-transform: uppercase;

		${({ $size }) => $size === "medium" && `font-size: 1em;`}
		${({ $size }) => $size === "large" && `font-size: 1.25em;`}

        background-color: #ffffeeff;
		transition: all 0.15s, transform 0.05s;
		transition-timing-function: ease-out;
		text-shadow: 0 0 4px #00000090;

        ${props => props.$disabled && `
            pointer-events: none;
            opacity: 0.4;
        `}

		&:before,
		&:after {
			content: "";
			position: absolute;
			transition: all 0.15s;
		}

		&:before {
			${({ $size }) =>
				$size === "medium" &&
				`
                left: -4px;
                right: -4px;
                top: -4px;
                bottom: -4px;
                border: 5px solid black;
            `};
			${({ $size }) =>
				$size === "large" &&
				`
                left: -5px;
                right: -5px;
                top: -5px;
                bottom: -5px;
                border: 12px solid black;
            `};

			border-radius: 10px;
		}
		&:after {
			${({ $size }) =>
				$size === "medium" &&
				`
                left: 1px;
                right: 1px;
                top: 0;
                bottom: 0;
                border: 1px solid #ffffeeff;
            `};

			${({ $size }) =>
				$size === "large" &&
				`
                left: 6px;
                right: 6px;
                top: 2px;
                bottom: 2px;
                border: 5px solid #ffffeeff;
            `};

			border-radius: 6px;
		}

		&:hover {
			transform: perspective(500px) translate3d(-5px, 0, 30px);
			background-color: black;

			&:after {
				border-color: black;
			}

			color: white;
		}

		&:active {
			background-color: rgba(0, 0, 0, 0.85);
			color: var(--link-click-color);
		}
	}
`;

interface ButtonProps {
	text: string;
	route?: string | object;
	size?: "medium" | "large";
	disabled?: boolean;
	onClick?: (object) => void;
}

export default function Button({ route = "", text, size = "medium", disabled, onClick }: ButtonProps) {
	const customClick = (e) => {
		if (onClick) {
			// Cancel route/hash link if callback provided
			e.preventDefault();

			onClick(e);
		}
	};

	// If route begins with "#", assume it's a hash link and use appropriate component
	const LinkElement =
		typeof route === "string" && route.indexOf("#") === 0 ? (
			<NavHashLink smooth to={route}>
				{text}
			</NavHashLink>
		) : (
			<Link to={route} onClick={customClick}>
				{text}
			</Link>
		);

	return (
		<Wrapper $size={size} $disabled={disabled}>
			{LinkElement}
		</Wrapper>
	);
}
