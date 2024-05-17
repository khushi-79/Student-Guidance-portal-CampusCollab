import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../database/firebase.config";
import "./ChatPage.css";

const Chats = () => {
	const [chats, setChats] = useState({});
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		if (!currentUser || !currentUser.uid) return; // Guard clause to ensure currentUser and uid are available

		const getChats = () => {
			const unsub = onSnapshot(
				doc(db, "userChats", currentUser.uid),
				(doc) => {
					setChats(doc.data() ? doc.data() : {});
				},
				(error) => {
					console.error("Error fetching chats:", error);
				}
			);

			return () => unsub();
		};

		return getChats();
	}, [currentUser]);

	const handleSelect = (u) => {
		dispatch({ type: "CHANGE_USER", payload: u });
	};

	if (!chats) return <div>Loading chats...</div>; // Display loading state while chats are not available

	return (
		<div className="chats">
			{Object.entries(chats)
				.sort((a, b) => b[1].date - a[1].date)
				.map(([key, chat]) => (
					<div
						className="userChat"
						key={key}
						onClick={() => handleSelect(chat.userInfo)}
					>
						<div className="userChatInfo">
							{/* Use optional chaining to safely access properties */}
							<span>{chat.userInfo?.name || "No Name"}</span>
							<p>{chat.lastMessage?.text || "No Last Message"}</p>
						</div>
					</div>
				))}
		</div>
	);
};

export default Chats;
