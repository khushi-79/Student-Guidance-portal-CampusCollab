import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase.config";

const AdminLogin = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const myCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
		if (
				myCredentials.user &&
				myCredentials.user.email.includes("@admin.com")
			) {
				localStorage.setItem(
					"adminUser",
					JSON.stringify({
						email: myCredentials.user.email,
						uid: myCredentials.user.uid,
					})
				);
				navigate("/AdminHome");
			} else {
				throw new Error("Access denied: Not an admin account");
			}
		} catch (error) {
			console.error("Admin Login Error:", error.message);
			setErr(true);
		}
	};

	return (
		<>
			<div className="logo">
				<img
					src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
					alt="Admin Logo"
					style={{ height: "50px", padding: "1rem" }}
				/>
				<h2 className="logo-heading">CampusCollab</h2>
			</div>
			<div className="main-container">
				<div className="sub-container">
					<div className="form-container">
						<p className="title">Admin Login</p>
						<form className="form" onSubmit={handleSubmit}>
							<div className="input-group">
								<label htmlFor="email">Email</label>
								<input type="email" name="email" id="email" required />
							</div>
							<div className="input-group">
								<label htmlFor="password">Password</label>
								<input type="password" name="password" id="password" required />
							</div>
							<div className="sign">
								<button type="submit">Login</button>
							</div>
						</form>
						{err && <p className="error">Login failed. Please try again.</p>}
						<p className="signup">
							<Link to="/">Back to main site</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminLogin;
