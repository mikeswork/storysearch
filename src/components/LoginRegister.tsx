import React, { useState, useContext, useRef } from "react";
import { RealmContext } from "../RealmApp";

export default function LoginRegister() {
	const { userReg, userLogin } = useContext(RealmContext);

	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [passwordDup, setPasswordDup] = useState("");

    const formEl = useRef<HTMLFormElement>(null);
    const passDupEl = useRef<HTMLInputElement>(null);

    const toggleMode = () => setIsLogin((prev) => !prev);
    
    const reset = () => {
        setEmail("");
        setPassword("");
        if (!isLogin) setPasswordDup("");
    }

	const submit = async (e) => {
		e.preventDefault();

		if (isLogin) {
            try {
                await userLogin(email, password);
            } catch {
                reset();
            }
		} else {
            try {
                await userReg(email, password);
                setIsLogin(true);
            } catch {
                reset();
            }
            
		}
	};

	// Validate if passwords match
	if (!isLogin && passDupEl.current) {
		const el = passDupEl.current;

		if (password === passwordDup && el.validity.customError) {
			passDupEl.current.setCustomValidity("");
		} else if (password !== passwordDup && !el.validity.customError) {
			passDupEl.current.setCustomValidity("This value must match the previous field.");
		}
	}

	return (
		<div>
			<form onSubmit={submit} ref={formEl}>
				<h3>{isLogin ? "Login" : "Register"}</h3>
				<p>
					<input
						type="button"
						value={isLogin ? "Switch to Register" : "Switch to Login"}
						onClick={toggleMode}
					/>
				</p>

				<input
					type="email"
					required={true}
					placeholder="Email"
					value={email}
					onChange={({ target: { value } }) => setEmail(value)}
				/>
				<input
					type="password"
					required={true}
					placeholder="Password"
					value={password}
					onChange={({ target: { value } }) => setPassword(value)}
				/>

				{!isLogin && (
					<input
						type="password"
						required={true}
						placeholder="Confirm Password"
						value={passwordDup}
						ref={passDupEl}
						onChange={({ target: { value } }) => setPasswordDup(value)}
					/>
				)}

				<input type="submit" value={isLogin ? "Login" : "Register"} />
				<input type="reset" />
			</form>
		</div>
	);
}
