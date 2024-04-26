import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase.config";

const Login = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
	e.preventDefault();
	const email = e.target[0].value;
	const password = e.target[1].value;

	try {
		const myCredentials = await signInWithEmailAndPassword(auth, email, password);
		// Store only necessary user data and ensure you do not store sensitive data like tokens.
		localStorage.setItem("currentUser", JSON.stringify({
			email: myCredentials.user.email,
			uid: myCredentials.user.uid
		}));
		navigate("/HomePage");
	} catch (error) {
		console.error("Login Error:", error.message);
		setErr(true);
		// You might also want to handle specific error messages here
	}
};


	return (
		<>
			<div className="logo">
				<img
					src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
					alt="logo"
					style={{ height: "50px", padding: "1rem" }}
				/>
				<h2 className="logo-heading">CampusCollab</h2>
			</div>
			<div className="main-container">
				<div className="sub-container">
					<div className="form-container">
						<p className="title">Login</p>
						<form className="form" onSubmit={handleSubmit}>
							<div className="input-group">
								<label htmlFor="email">Email</label>
								<input type="text" name="email" id="email" />
							</div>
							<div className="input-group">
								<label htmlFor="password">Password</label>
								<input type="password" name="password" id="password" />
							</div>
							<div className="sign">
								<button type="submit">Login</button>
							</div>
						</form>
						<p className="signup">
							Don't have an account? <Link to="/">Sign Up</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
