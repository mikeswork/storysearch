import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";

const app: Realm.App = new Realm.App({ id: "storysearchapp-phwgx" });

type RealmUserType = Realm.User | undefined;
type UserFuncType = (email: string, password: string) => Promise<void>;

interface RealmAppType {
    anonUser: RealmUserType;
    userReg: UserFuncType;
	userLogin: UserFuncType;
	passwordUser?: RealmUserType;
}

const placeholder = async (email, password) => {};

const RealmContext = React.createContext<RealmAppType>({
    anonUser: undefined,
    userReg: placeholder,
    userLogin: placeholder
});
export { RealmContext };

function RealmApp({ children }) {
	// console.log("[App][render]");
	const [anonUser, setAnonUser]: [RealmUserType, Function] = useState<RealmUserType>();
	const [passwordUser, setPasswordUser]: [RealmUserType, Function] = useState<RealmUserType>();

	useEffect(() => {
        // console.log("[App][useEffect]");
        let isSubscribed = true;

		// Automatic, anonymous login
		app.logIn(Realm.Credentials.anonymous())
			.then((user) => {
                if (isSubscribed) {
                    console.log("Successfully logged in anonymous user!", user);
				    setAnonUser(user);
                }
			})
			.catch((err) => {
				if (isSubscribed) console.error("Failed to log in anonymous user:", err);
            });
            
        return () => { isSubscribed = false; }
	}, []);

	async function userLogin(email: string, password: string) {
		const credentials = Realm.Credentials.emailPassword(email, password);

		try {
			// Authenticate the user
			const user: Realm.User = await app.logIn(credentials);

			console.log("Successfully logged in password user!", user);
			setPasswordUser(user);
		} catch (err) {
			console.error("Failed to log in password user:", err);
		}
	}

	async function userReg(email: string, password: string) {
		try {
			await app.emailPasswordAuth.registerUser(email, password);
		} catch (err) {
			console.error("Failed to register user:", err);
		}
	}

	return (
		<RealmContext.Provider value={{ anonUser, userReg, userLogin, passwordUser }}>
            {children}
        </RealmContext.Provider>
	);
}

export default RealmApp;
