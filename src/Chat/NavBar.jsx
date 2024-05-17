import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the path as necessary

const Navbar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="navbar">
			<span className="logo">Chat</span>
			<div className="user">
				{/* Handle cases where currentUser might be null or undefined */}
				<span>
					{currentUser ? currentUser.displayName || "No name set" : "Guest"}
				</span>
			</div>
		</div>
	);
};

export default Navbar;
