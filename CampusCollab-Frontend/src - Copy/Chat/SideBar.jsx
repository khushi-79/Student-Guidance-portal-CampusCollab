import React from "react";
import Navbar from "./NavBar";
import Search from "./Search";
import Chats from "./ChatPage";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<Navbar />
			<Search />
			<Chats />
		</div>
	);
};

export default Sidebar;
