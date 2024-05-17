import React, { useState } from "react";
import "./login_sigin.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../database/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import Add from "../assets/chat-img/add.png";

const AdminSignUp = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const displayName = e.target.name.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const confirmPassword = e.target.c_password.value;
		const file = e.target.avatar.files[0];

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const date = new Date().getTime();
			const storageRef = ref(storage, `${displayName + date}`);
			const uploadTask = await uploadBytesResumable(storageRef, file);

			getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
				await updateProfile(res.user, { displayName, photoURL: downloadURL });
				await setDoc(doc(db, "adminUser", res.user.uid), {
					uid: res.user.uid,
					displayName,
					email,
					// It is a security risk to store plain passwords in Firestore.
					// Instead, handle authentication through Firebase Authentication.
					role: "admin",
					photoURL: downloadURL,
				});

				navigate("/AdminHome");
			});
		} catch (err) {
			console.error("Error signing up admin:", err);
			setError(true);
			setLoading(false);
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
						<p className="title">Admin Sign Up</p>
						<form className="form" onSubmit={handleSubmit}>
							<div className="input-group">
								<label htmlFor="name">Name</label>
								<input type="text" name="name" id="name" required />
							</div>
							<div className="input-group">
								<label htmlFor="email">Email</label>
								<input type="email" name="email" id="email" required />
							</div>
							<div className="input-group">
								<label htmlFor="password">Password</label>
								<input type="password" name="password" id="password" required />
								<label htmlFor="c_password">Confirm Password</label>
								<input
									type="password"
									name="c_password"
									id="c_password"
									required
								/>
							</div>
							<div className="input-group">
								<input
									required
									style={{ display: "none" }}
									type="file"
									id="file"
									name="avatar"
								/>
								<label htmlFor="file">
									<img src={Add} alt="Add avatar" />
									<span>Add an avatar</span>
								</label>
							</div>
							<div className="sign">
								<button type="submit" disabled={loading}>
									Sign Up
								</button>
							</div>
						</form>
						{error && (
							<p className="error">
								Failed to create account. Please try again.
							</p>
						)}
						<p className="signin">
							Already have an account? <Link to="/AdminLogin">Sign In</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminSignUp;
