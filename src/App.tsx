import React from "react";
import { ThemeProvider } from "styled-components";
import Masthead from "./components/Masthead";
import RandomStory from "./components/RandomStory";
import StoryForm from "./components/StoryForm";

const theme = {
    main: `h1, h3 {font-weight: normal;}`
}

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Masthead/>
            <RandomStory/>
            <StoryForm/>
		</ThemeProvider>
	);
}

export default App;
