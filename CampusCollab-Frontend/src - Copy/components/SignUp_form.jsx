import React, { useState } from "react";
import "./Form.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../database/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import Add from '../assets/chat-img/add.png'; // Adjust the path as necessary

const SignUp_form = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState("student"); // Default role
	const navigate = useNavigate();

	const handleRoleChange = (e) => {
		setRole(e.target.value);
	};

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
			await uploadBytesResumable(storageRef, file).then(async () => {
				getDownloadURL(storageRef).then(async (downloadURL) => {
					try {
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, "users", res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							password,
							role,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, "userChats", res.user.uid), {}); // Initialize empty user chats
						navigate("/HomePage");
					} catch (err) {
						console.error(err);
						setError(true);
						setLoading(false);
					}
				});
			});
			} catch (err) {
				console.error(err);
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
						<p className="title">Sign Up</p>
						<form className="form" onSubmit={handleSubmit}>
							<div className="input-group">
								<label htmlFor="name">Name</label>
								<input type="text" name="name" id="name" required />
							</div>
							<div className="input-group">
								<label htmlFor="email">Email</label>
								<input type="text" name="email" id="email" required />
							</div>
							<div className="input-group">
								<label htmlFor="role">Role</label>
								<div className="radio-options">
									<label className="radio-label">
										<input
											type="radio"
											name="role"
											value="student"
											checked={role === "student"}
											onChange={handleRoleChange}
										/>
										Student
									</label>
									<label className="radio-label">
										<input
											type="radio"
											name="role"
											value="alumni"
											checked={role === "alumni"}
											onChange={handleRoleChange}
										/>
										Alumni
									</label>
								</div>
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
									name="avatar" // Add a name attribute
								/>
								<label htmlFor="file">
									<img src={Add} alt="" />
									<span>Add an avatar</span>
								</label>
							</div>
							<div className="sign">
								<button type="submit" disabled={loading}>
									SignUp
								</button>
							</div>
						</form>
						<p className="signin">
							Already have an account? <Link to="/Login">Sign In</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp_form;
