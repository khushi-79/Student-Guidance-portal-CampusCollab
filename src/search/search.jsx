import React, { useState } from "react";
import "./search.css";
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

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handlePostChange = (event) => {
		setText(event.target.value);
	};

	const handlePostSubmit = (event) => {
		event.preventDefault();
		console.log("Your post:", text);
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
					placeholder="What's on your mind, Anubhav?"
				/>
				<div className="buttons">
					<button type="button">LiveVideo</button>
					<button type="button">Photo/Video</button>
					<button type="submit" onClick={handlePostSubmit}>
						Post
					</button>
				</div>
			</div>
			<div className="Posted">
				<div className="poster">
					<div className="Simplilearn">
						<img
							src="src/assets/homepage/demo-1.png"
							alt="Img"
							style={{ height: "50px", width: "50px", borderRadius: "50%" }}
						/>
						Simplilearn
						<div className="update"> Updated his cover image.</div>
					</div>
					<div className="edit">
						<MdMoreHoriz fontsize="1.5rem" />
					</div>
				</div>
				<div className="caption">
					Please Like, Comment and Subscribe to our YouTube Channel.
				</div>
				<br></br>
				<div className="FacebookImg">
					<img
						src="src/assets/homepage/demo-1.png"
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
		</div>
	);
}

export default Search;
