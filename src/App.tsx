import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Masthead from "./components/Masthead";
import StoryPreview from "./components/StoryPreview";
import StoryForm from "./components/StoryForm";
import StoryFull from "./components/StoryFull";
import * as Realm from "realm-web";

const app: Realm.App = new Realm.App({ id: "storysearchapp-phwgx" });

const theme = {
	main: `h1, h3 {font-weight: normal;}`,
};

function App() {
    const [mongoUser, setMongoUser]: [Realm.User | null, Function] = useState<Realm.User | null>(null);

	useEffect(() => {
		loginAnonymous().then((user) => {
            console.log("Successfully logged in!", user);

            setMongoUser(user)
        });
    }, []);
    
    async function loginAnonymous() {    
        try {
            console.log("Authenticating user...");

            // Authenticate the user
            const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());
            return user;
        } catch (err) {
            console.error("Failed to log in:", err);
        }
    }

	return (
        <Router>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route path="/story/:docId">
                        <StoryFull mongoUser={mongoUser} />
                    </Route>

                    <Route>
                        <Masthead />
                        <StoryPreview mongoUser={mongoUser} />
                        <StoryForm mongoUser={mongoUser} />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
	);
}

export default App;