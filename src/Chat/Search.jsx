import React, { useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase.config";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
	const [users, setUsers] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		if (currentUser) {
			// Check if currentUser is not null
			const fetchUsers = async () => {
				try {
					const querySnapshot = await getDocs(collection(db, "users"));
					const usersArray = [];
					querySnapshot.forEach((doc) => {
						if (doc.id !== currentUser.uid) {
							// Filter out the current logged in user
							usersArray.push(doc.data());
						}
					});
					setUsers(usersArray);
				} catch (error) {
					console.error("Error fetching users: ", error);
				}
			};
			fetchUsers();
		}
	}, [currentUser]); // Depend on currentUser object itself

	const handleSelect = (user) => {
		dispatch({ type: "CHANGE_USER", payload: user });
	};

	return (
		<div className="search">
			<div className="userList">
				{users.map((user) => (
					<div
						key={user.uid}
						className="userChat"
						onClick={() => handleSelect(user)}
					>
						<img src={user.photoURL} alt="" />
						<div className="userChatInfo">
							<span>{user.displayName}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Search;
