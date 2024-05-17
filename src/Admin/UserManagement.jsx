import React, { useState, useEffect } from "react";
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";
import {
	FaPlusCircle,
	FaFacebookMessenger,
	FaSignOutAlt,
	FaUser,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./UserMange.css";
import "./login_sigin.css";

function UserManagement() {
	const [users, setUsers] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();
	const db = getFirestore();

	useEffect(() => {
		const fetchUsers = async () => {
			const querySnapshot = await getDocs(collection(db, "users"));
			const userList = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setUsers(userList);
		};
		fetchUsers();
    }, []);
    
    const handleLogoutClick = () => {
			navigate("/AdminLogin");
		};

	const handleDeleteUser = async (userId) => {
		await deleteDoc(doc(db, "users", userId));
		setUsers(users.filter((user) => user.id !== userId));
	};

	const handleEditUser = (user) => {
		setEditMode(true);
		setCurrentUser(user);
    };

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password, role } = event.target.elements;
		if (currentUser.id) {
			await updateDoc(doc(db, "users", currentUser.id), {
				displayName: displayName.value,
				email: email.value,
				role: role.value,
			});
		} else {
			await addDoc(collection(db, "users"), {
				displayName: displayName.value,
				email: email.value,
				password: password.value, 
				role: role.value,
			});
		}
		setEditMode(false);
		setCurrentUser({});
	};

	const handleBack = () => {
		setEditMode(false);
		setCurrentUser({});
	};

    return (
			<div className="combined-component">
				<div className="header-container">
					<div className="first-section">
						<div className="logo">
							<img
								src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
								alt="logo"
								style={{ height: "50px", padding: "1rem" }}
							/>
						</div>
						<p>Welcome</p>
						<div className="HomePage">
						</div>
						<div className="middle-header"></div>
						<div className="svg-icons">
							<div className="plus">
								<Link to="/AdminHome">
									<FaPlusCircle fontSize="1.5rem" />
								</Link>
							</div>
							<div className="plus">
								<Link to="/Home">
									<FaFacebookMessenger href="" fontSize="1.5rem" />
								</Link>
							</div>
							<div className="plus" onClick={() => navigate("/Users")}>
								<FaUser />
							</div>
							<div className="plus" onClick={handleLogoutClick}>
								{/* Logout Icon */}
								<FaSignOutAlt fontSize="1.5rem" />
							</div>
						</div>
					</div>
				</div>
				<div className="user-management-container">
					<h1>User Management</h1>
					<div>
						<button onClick={() => handleEditUser({})}>Add New User</button>
					</div>
					{editMode ? (
						<form onSubmit={handleSubmit}>
							<input
								defaultValue={currentUser.displayName}
								name="displayName"
								placeholder="Name"
								required
							/>
							<input
								defaultValue={currentUser.email}
								name="email"
								placeholder="Email"
								required
							/>
							{!currentUser.id && (
								<input
									name="password"
									type="password"
									placeholder="Password"
									required
								/>
							)}
							<input
								defaultValue={currentUser.role}
								name="role"
								placeholder="Role"
								required
							/>
							<button type="submit">Save</button>
							<button onClick={handleBack}>Cancel</button>
						</form>
					) : (
						<table>
							<thead>
								<tr>
									<th>Sr No.</th>
									<th>Username</th>
									<th>Email</th>
									<th>Role</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
									<tr key={user.id}>
										<td>{index + 1}</td>
										<td>{user.displayName}</td>
										<td>{user.email}</td>
										<td>{user.role}</td>
										<td>
											<button onClick={() => handleEditUser(user)}>Edit</button>
										</td>
										<td>
											<button onClick={() => handleDeleteUser(user.id)}>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		);
}

export default UserManagement;
