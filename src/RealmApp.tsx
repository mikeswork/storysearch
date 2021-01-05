import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";

const app: Realm.App = new Realm.App({ id: "storysearchapp-phwgx" });

type RealmUserType = Realm.User | undefined;
interface RealmAppType {
	mongoUser?: RealmUserType;
	passwordUser?: RealmUserType;
	loginPassword?: (email: string, password: string) => {};
}

const RealmContext = React.createContext<RealmAppType>({});
export { RealmContext };

function RealmApp({ children }) {
	// console.log("[App][render]");
	const [mongoUser, setMongoUser]: [RealmUserType, Function] = useState<RealmUserType>();
	const [passwordUser, setPasswordUser]: [RealmUserType, Function] = useState<RealmUserType>();

	useEffect(() => {
		// console.log("[App][useEffect]");
		loginAnonymous();
	}, []);

	async function loginAnonymous() {
		try {
			// console.log("Authenticating user...");

			// Authenticate the user
			const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());

			console.log("Successfully logged in anonymous user!", user);
			setMongoUser(user);
		} catch (err) {
			console.error("Failed to log in anonymous user:", err);
		}
	}

	async function loginPassword(email: string, password: string) {
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

	return (
		<RealmContext.Provider value={{ mongoUser, passwordUser, loginPassword }}>
			{children}
		</RealmContext.Provider>
	);
}

export default RealmApp;
