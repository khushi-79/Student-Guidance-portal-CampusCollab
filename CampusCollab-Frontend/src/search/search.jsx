import React, { useState } from "react";
import "./search.css";
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiFillHome, AiOutlineWallet } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";
import {
	FaPlusCircle,
	FaFacebookMessenger,
	FaBell,
	FaUsers,
	FaRegThumbsUp,
	FaCommentAlt,
	FaRegShareSquare,
} from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

function Search() {
	const [setSearchTerm] = useState("");
	const [text, setText] = useState("");
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

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

	const handlePostSubmit = (event) => {
		event.preventDefault();
		if (!text.trim()) return; // Prevent posting empty content
		const newPost = {
		  content: text,
		  timestamp: new Date().toISOString(), // Add timestamp
		  author: "Anonymous", // Add author
		};
		setPosts([...posts, newPost]);
		setText("");
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
					<div className="Search">
						<AiOutlineSearch style={{ height: "1rem" }} />
						<input placeholder="Search News" type="Search" />
					</div>
					<div className="middle-header">
						<div className="Icon">
							<AiFillHome fontSize="1.5rem" color="#F4C2C2" />
						</div>
						<div className="Icon">
							<MdOndemandVideo fontSize="1.5rem" />
						</div>
						<div className="Icon">
							<FaUsers fontSize="1.5rem" />
						</div>
						<div className="Icon">
							<AiOutlineWallet fontSize="1.5rem" />
						</div>
					</div>
					<div className="svg-icons">
						<div className="plus">
							<FaPlusCircle fontSize="1.5rem" />
						</div>
						<div className="plus">
							<FaFacebookMessenger fontSize="1.5rem" />
						</div>
						<div className="plus">
							<FaBell fontSize="1.5rem" />
						</div>
						<div className="Pluss">
							<img
								src="src/assets/homepage/demo-1.png"
								alt="dp"
								style={{ height: "40px" }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="post-composer">
				<textarea
					value={text}
					onChange={handlePostChange}
					placeholder="What's on your mind?"
				/>
				<div className="buttons">
					<Link to="/live-video">
					<button type="button">LiveVideo</button>
					</Link>
					<button><label htmlFor="photo-upload" className="custom-file-upload">
						<input id="photo-upload" type="file" onChange={handlePhoto} accept="image/*" style={{display: 'none'}} />
						Photo
					</label></button>
					<button><label htmlFor="video-upload" className="custom-file-upload">
						<input id="video-upload" type="file" onChange={handleVideo} accept="video/*" style={{display: 'none'}} />
						Video
					</label></button>
					<button type="submit" onClick={handlePostSubmit}>
					Post
					</button>
					<Link to="/chat">
					<button type="button">Chat</button>
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
					<br></br>Collaborate with us we will help you to solve your questions :)
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
				<br/>
				
				{posts.map((post, index) => (
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
				<br/>
				<hr/>

					</div>
				))}
			</div>
		</div>
	);
}

export default Search;
