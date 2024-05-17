import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Chat from "./Chat";
import { Link, useNavigate } from "react-router-dom";
import {
	FaPlusCircle,
	FaFacebookMessenger,
	FaSignOutAlt
  } from "react-icons/fa";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {

	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
	  const auth = getAuth();
	  onAuthStateChanged(auth, (user) => {
		if (user) {
		  // User is signed in, see docs for a list of available properties
		  // https://firebase.google.com/docs/reference/js/firebase.User
		  setCurrentUser(user);
		} else {
		  // User is signed out
		  navigate("/Login");
		}
	  });
	}, [navigate]);
	const handleLogoutClick = () => {
		navigate("/Login");
	  };

	return (
		<div className="combined-component">
		<div style={{background: " #dacdbb"}} className="header-container">
		<div className="first-section">
          <div className="logo">
            <img
              src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
              alt="logo"
              style={{ height: "50px", padding: "1rem" }}
            />
          </div>
		  <p>Welcome {currentUser ? currentUser.displayName : "User"}</p>
          <div className="HomePage">
            {/* <AiOutlineSearch style={{ height: "1rem" }} /> */}
            {/* <input placeholder="HomePage News" type="HomePage" /> */}
          </div>
          <div className="middle-header"></div>
          <div className="svg-icons">
            <div className="plus">
              <Link to="/HomePage">
              <FaPlusCircle fontSize="1.5rem" />
              </Link>
            </div>
            <div className="plus">
              <Link to="/Home">
                <FaFacebookMessenger href="" fontSize="1.5rem" />
              </Link>
            </div>
            <div className="plus" onClick={handleLogoutClick}>
              {/* Logout Icon */}
              <FaSignOutAlt fontSize="1.5rem" />
            </div>
          </div>
        </div>
      </div>
		<div className="home">
			<div className="container">
				<Sidebar />
				<Chat />
			</div>
		</div>
		</div>
	);
};

export default Home;
