import React, { useState, useEffect } from "react";
import "./homePage.css";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineSearch} from "react-icons/ai";
import {
	FaPlusCircle,
	FaFacebookMessenger,
	FaBell,
	FaRegThumbsUp,
	FaCommentAlt,
	FaRegShareSquare,
} from "react-icons/fa";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function HomePage() {
	const [text, setText] = useState("");
	const [posts, setPosts] = useState([]);
	// const [userName, setUserName] = useState("");
	//  useEffect(() => {
	// 		let value = localStorage.getItem("userName");
	// 	 setUserName(value);
	//  }, []);
	// const currentUser = localStorage.getItem("currentUser");
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
				navigate("/login");
			}
		});
	}, [navigate]);
	
	const handlePostChange = (event) => {
		setText(event.target.value);
	};

	const handlePhoto = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		setPostType("photo"); // Set post type to photo
	};

	const handleVideo = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		setPostType("video"); // Set post type to video
	};

	const handlePostSubmit = async(event) => {
		event.preventDefault();
		if (!text.trim()) return; // Prevent posting empty content
		const newPost = {
		  content: text,
		  timestamp: new Date().toISOString(), // Add timestamp
		  author:"anonymous", // Add author
		};

		const db = getFirestore();
		const userRef = collection(db, "post-details");
		await addDoc(userRef, {
			content: text,
			timestamp: new Date().toISOString(), // Add timestamp
			author: "anonymous", // Add author// Save the user ID from Firebase Authentication
		});
		setPosts([...posts, newPost]);
		setText("");
	};
	 const handleLogoutClick = () => {
			navigate("/Login");
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
					<p>Welcome {currentUser ? currentUser.displayName : "User"}</p>
					<div className="HomePage">
						<AiOutlineSearch style={{ height: "1rem" }} />
						<input placeholder="HomePage News" type="HomePage" />
					</div>
					<div className="middle-header"></div>
					<div className="svg-icons">
						<div className="plus">
							<FaPlusCircle fontSize="1.5rem" />
						</div>
						<div className="plus">
							<Link to="/Home">
								<FaFacebookMessenger href="" fontSize="1.5rem" />
							</Link>
						</div>
						<div className="plus">
							<FaBell fontSize="1.5rem" />
						</div>
						<div className="Pluss">
							<button onClick={handleLogoutClick}>Logout</button>
						</div>
					</div>
				</div>
			</div>
			<div className="post-composer">
				<textarea
					value={text}
					onChange={handlePostChange}
					placeholder={
						`What's on your mind, ${currentUser ? currentUser.displayName : 'User'}?`
					}
					w
				/>
				<div className="buttons">
					<button>
						<label htmlFor="photo-upload" className="custom-file-upload">
							<input
								id="photo-upload"
								type="file"
								onChange={handlePhoto}
								accept="image/*"
								style={{ display: "none" }}
							/>
							Photo
						</label>
					</button>
					<button>
						<label htmlFor="video-upload" className="custom-file-upload">
							<input
								id="video-upload"
								type="file"
								onChange={handleVideo}
								accept="video/*"
								style={{ display: "none" }}
							/>
							Video
						</label>
					</button>
					<button type="submit" onClick={handlePostSubmit}>
						Post
					</button>
					<Link to="/Home">
						<button type="submit">Chat</button>
					</Link>
				</div>
			</div>
			<div className="Posted">
				<div className="poster">
					<div className="Simplilearn">
						<img
							src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
							alt="Img"
							style={{ height: "40px", width: "40px", borderRadius: "50%" }}
						/>
						CampusCollab
					</div>
				</div>
				<div className="caption">
					Welcome to CampusCollab!
					<br></br>Collaborate with us we will help you to solve your questions
					:)
				</div>
				<br></br>
				<div className="FacebookImg">
					<img
						src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
						alt="dp"
						style={{ height: "auto", width: "100%" }}
					/>
				</div>
				<div className="Comment">
					<div className="Like">
						<FaRegThumbsUp color="grey" />
						Like
					</div>
					<div className="Like">
						<FaCommentAlt color="grey" />
						Comment
					</div>
					<div className="Like">
						<FaRegShareSquare color="grey" />
						Share
					</div>
				</div>
			</div>
			<br />

			{posts.map((post, index) => (
				<div className="Posted">
					<div key={index} className="post">
						<div className="poster">
							<div className="Simplilearn">
								<img
									src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
									alt="Img"
									style={{ height: "40px", width: "40px", borderRadius: "50%" }}
								/>
								{post.author}
							</div>
						</div>
						<div className="caption">{post.content}</div>
						<div className="Comment">
							<div className="Like">
								<FaRegThumbsUp color="grey" />
								Like
							</div>
							<div className="Like">
								<FaCommentAlt color="grey" />
								Comment
							</div>
							<div className="Like">
								<FaRegShareSquare color="grey" />
								Share
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default HomePage;
