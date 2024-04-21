import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import signInWithEmailAndPassword
import app from "../database/firebase.config"; // Assuming you have Firebase initialized in this file
import "../components/Form.css";

const Signin_form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User successfully logged in

      navigate("/HomePage");
      // You can redirect or handle success here
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Failed to sign in. Please check your credentials and try again.");
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
            <form className="form" onSubmit={handleSignIn}>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="sign" type="submit">
                Login
              </button>
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

export default Signin_form;
