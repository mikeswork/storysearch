import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RealmApp from "./RealmApp";
import Masthead from "./components/Masthead";
import StoryPreview from "./components/StoryPreview";
import StoryForm from "./components/StoryForm";
import StoryFull from "./components/StoryFull";
import StoryWinner from "./components/StoryWinner";
import loading from "./assets/loading.gif";

const theme = {
    loading: `background: url(${loading}) no-repeat 50%/150px;`,
    lightBg: `background-color: #eee;`
};

function App() {
    // console.log("[App][render]");

	return (
        <RealmApp>
            <Router>
                <ThemeProvider theme={theme}>
                    <Switch>
                        <Route path="/story/:docId">
                            <StoryWinner />
                        </Route>

                        <Route path="/story">
                            <StoryFull />
                        </Route>

                        <Route>
                            <Masthead />
                            <StoryPreview />
                            <StoryForm />
                        </Route>
                    </Switch>
                </ThemeProvider>
            </Router>
        </RealmApp>
	);
}

export default App;
