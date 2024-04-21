import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import app from "../database/firebase.config";

const SignUp_form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value); // Update the role state based on the selected radio button
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== c_password) {
      alert("Passwords do not match");
      return;
    }

    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // After user is created, save additional details to Firestore
      const db = getFirestore();
      const userRef = collection(db, "signup");
      await addDoc(userRef, {
        name: name,
        email: email,
        role: role,
        userId: userCredential.user.uid, // Save the user ID from Firebase Authentication
      });

      navigate("/SignIn");
      // Redirect or handle success as needed
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert("Failed to register user. Please try again.");
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
            <form className="form" onSubmit={handleSignUp}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="role">Role</label>

                <div className="radio-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="role"
                      id="studentbt"
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
                      id="alumnibt"
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
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="c_password">Confirm Password</label>
                <input
                  type="password"
                  name="c_password"
                  id="c_password"
                  placeholder=""
                  value={c_password}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>
              <button className="sign" type="submit">
                Sign Up
              </button>
            </form>
            <p className="signin">
              Already have an account? <Link to="/SignIn">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp_form;
