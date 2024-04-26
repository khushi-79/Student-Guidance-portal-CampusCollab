import React from "react";
import Sidebar from "./SideBar";
import Chat from "./Chat";

const Home = () => {
	return (
		<div className="home">
			<div className="container">
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
};

export default Home;
