import React, { useState, useEffect } from "react";
import "./login_sigin.css";
import { useNavigate, Link } from "react-router-dom";
import {
	FaPlusCircle,
	FaFacebookMessenger,
	FaSignOutAlt,
	FaRegThumbsUp,
	FaCommentAlt,
	FaRegShareSquare,
	FaUser,
	FaTimes
} from "react-icons/fa";
import {
	collection,
	addDoc,
	getFirestore,
	query,
	orderBy,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	increment,
	where
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AdminHome() {
	const [text, setText] = useState("");
	const [posts, setPosts] = useState([]);
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [editedPostId, setEditedPostId] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [likedPosts, setLikedPosts] = useState([]); // State to store liked posts
	const [commentModalOpen, setCommentModalOpen] = useState(false);
	const [postComments, setPostComments] = useState({});
	const [postId, setPostId] = useState(null);
  
	const handleOpenComment = (postId) => {
	  setPostId(postId);
	  setCommentModalOpen(true);
	};
  
	const handleCloseCommentModal = () => {
	  setCommentModalOpen(false);
	  setPostId(null);
	};
  
	// Function to fetch comments for a specific post
	const loadPostComments = async (postId) => {
	  try {
		const db = getFirestore();
		const commentsCollection = collection(db, "post-comments");
		const q = query(commentsCollection, where("postId", "==", postId));
		const querySnapshot = await getDocs(q);
		const comments = [];
		querySnapshot.forEach((doc) => {
		  comments.push({ id: doc.id, ...doc.data() });
		});
		setPostComments((prevComments) => ({
		  ...prevComments,
		  [postId]: comments,
		}));
	  } catch (error) {
		console.error("Error fetching comments:", error);
	  }
	};
  
	// Call loadPostComments whenever a new post is loaded or when the user opens the comment modal
	useEffect(() => {
	  // Load comments for each post
	  posts.forEach((post) => {
		loadPostComments(post.id);
	  });
	}, [posts]);
  
	const handleCommentSubmit = async (comment) => {
	  console.log("Commenting on post:", postId); // Log postId to check
  
	  try {
		const db = getFirestore();
		const commentsCollection = collection(db, "post-comments");
  
		const commentData = {
		  timestamp: new Date().toISOString(),
		  author: currentUser.displayName || "anonymous",
		  content: comment,
		  postId: postId,
		};
  
		await addDoc(commentsCollection, commentData);
  
		console.log("Comment submitted for post:", postId, "Comment:", comment);
  
		handleCloseCommentModal();
	  } catch (error) {
		console.error("Error submitting comment:", error);
	  }
	};
  
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
  
	// Other hooks and functions...
  
	const handleLogoutClick = () => {
	  navigate("/Login");
	};
  
	const handleDeletePost = async (postId) => {
	  try {
		const db = getFirestore();
		const postRef = doc(db, "post-details", postId);
		await deleteDoc(postRef);
		setPosts(posts.filter((post) => post.id !== postId)); // Remove the post from state
	  } catch (error) {
		console.error("Error deleting post:", error);
	  }
	};

	const handleDeleteComment = async (commentId,postId) => {
		try {
		  // Send a request to delete the comment from the database
		  const db = getFirestore();
		  const commentRef = doc(db, "post-comments", commentId);
		  await deleteDoc(commentRef);
		  console.log("Comment deleted successfully.");

		  loadPostComments(postId);
		} catch (error) {
		  console.error("Error deleting comment:", error);
		}
	  };
  
	const handleEditPost = (postId, content, imageUrl, fileUrl) => {
	  setText(content);
	  setImage(imageUrl); // Set image URL for editing
	  setEditedPostId(postId); // Track the edited post ID
	};
  
	const handleCancelEdit = () => {
	  setText(""); // Clear text field
	  setImage(null); // Clear image URL
	  setFile(null); // Clear file URL
	  setEditedPostId(null); // Clear edited post ID
	};
  
	const handlePostEditSubmit = async (event) => {
	  event.preventDefault();
  
	  try {
		const db = getFirestore();
		const postRef = doc(db, "post-details", editedPostId);
  
		// Update post data with edited content
		const updatedPostData = {
		  timestamp: new Date().toISOString(),
		  author: currentUser.displayName || "anonymous",
		  userId: currentUser.uid,
		  content: text,
		};
  
		if (image) {
		  const imgRef = ref(storage, `images/${image.name}`);
		  await uploadBytes(imgRef, image);
		  const downloadUrl = await getDownloadURL(imgRef);
		  postData.imageUrl = downloadUrl;
		}
  
		if (file) {
		  const fileRef = ref(storage, `files/${file.name}`);
		  await uploadBytes(fileRef, file);
		  const downloadUrl = await getDownloadURL(fileRef);
		  postData.fileUrl = downloadUrl;
		}
  
		await updateDoc(postRef, updatedPostData);
		console.log("Post edited successfully.");
  
		// Clear input fields after successful edit
		handleCancelEdit();
  
		// Reload posts
		const querySnapshot = await getDocs(collection(db, "post-details"));
		const updatedPosts = [];
		querySnapshot.forEach((doc) => {
		  updatedPosts.push({ id: doc.id, ...doc.data() });
		});
		setPosts(updatedPosts);
	  } catch (error) {
		console.error("Error editing post:", error);
	  }
	};
  
	const handleImgChange = (e) => {
	  const file = e.target.files[0];
	  if (file && file.type.startsWith("image/")) {
		setImage(file);
	  } else {
		alert("Please select a valid image file.");
	  }
	};
  
	const handleFileChange = async (e) => {
	  const file = e.target.files[0];
	  if (
		file &&
		(file.type === "application/pdf" ||
		  file.type ===
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
		  file.type === "text/plain")
	  ) {
		setFile(file);
	  } else {
		alert("Please select a valid PDF, DOC, or TXT file.");
	  }
	};
  
	const handleCancel = () => {
	  setImage(null);
	  setFile(null); // Clear the selected image
	  
	};

	
	const getFileName = (myFileName) => {
	  const decodedFileName = decodeURIComponent(myFileName.split("/").pop());
	  // console.log(decodedFileName); // Output: files/buspass.pdf?alt=media&token=10dea571-266b-46c1-b963-4e8d725e075f
  
	  // Extract filename without directory structure and parameters
	  const fileNameWithoutDirAndParams = decodedFileName
		.split("/")
		.pop()
		.split("?")[0];
	  const fileNameWithoutExtension = fileNameWithoutDirAndParams
		.split(".")
		.slice(0, -1)
		.join(".");
	  return fileNameWithoutExtension;
	};
  
	const toggleDropdown = () => {
	  setIsOpen(!isOpen);
	};
  
	const loadPosts = async () => {
	  const db = getFirestore();
	  const postsCollection = collection(db, "post-details");
	  const q = query(postsCollection, orderBy("timestamp", "desc")); // Order posts by timestamp desc
  
	  try {
		const querySnapshot = await getDocs(q);
		const loadedPosts = [];
		querySnapshot.forEach((doc) => {
		  // const postData = doc.data();
		  const postData = { id: doc.id, ...doc.data(), comments: [] };
		  if (likedPosts.includes(postData.id)) {
			postData.liked = true;
		  } else {
			postData.liked = false;
		  }
		  loadedPosts.push(postData);
		});
  
		setPosts(loadedPosts);
	  } catch (error) {
		console.error("Error fetching posts: ", error);
	  }
	};
  
	useEffect(() => {
	  // Load liked posts from local storage when the component mounts
	  const savedLikedPosts = localStorage.getItem("likedPosts");
	  if (savedLikedPosts) {
		setLikedPosts(JSON.parse(savedLikedPosts));
	  }
  
	  loadPosts();
	}, []);
  
	// Function to save liked posts in local storage
	useEffect(() => {
	  localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
	}, [likedPosts]);
  
	const handlePostSubmit = async (event) => {
	  event.preventDefault();
  
	  if (!image && !file && !text.trim()) {
		alert("Please add an image or file, and enter some text before posting.");
		return;
	  }
  
	  if ((!image || !file) && !text.trim()) {
		alert("Please enter some text to accompany the image or file.");
		return;
	  }
  
	  try {
		const db = getFirestore();
		const postsCollection = collection(db, "post-details");
  
		// Prepare post data
		const postData = {
		  timestamp: new Date().toISOString(),
		  author: currentUser.displayName || "anonymous",
		  userId: currentUser.uid, // Save the current user's ID
		};
  
		if (image) {
		  const imgRef = ref(storage, `images/${image.name}`);
		  await uploadBytes(imgRef, image);
		  const downloadUrl = await getDownloadURL(imgRef);
		  postData.imageUrl = downloadUrl;
		}
  
		if (file) {
		  const fileRef = ref(storage, `files/${file.name}`);
		  await uploadBytes(fileRef, file);
		  const downloadUrl = await getDownloadURL(fileRef);
		  postData.fileUrl = downloadUrl;
		}
  
		if (text.trim()) {
		  postData.content = text;
		}
  
		// Add post to Firestore
		await addDoc(postsCollection, postData);
		console.log("Post added successfully.");
  
		// Clear input fields after successful post
		setImage(null);
		setFile(null);
		setText("");
  
		// Reload posts
		loadPosts();
	  } catch (error) {
		console.error("Error adding post:", error);
	  }
	};
  
	const handleLike = async (postId) => {
	  try {
		let updatedLikedPosts;
		if (likedPosts.includes(postId)) {
		  updatedLikedPosts = likedPosts.filter((id) => id !== postId);
  
		  const db = getFirestore();
		  const postRef = doc(db, "post-details", postId);
		  await updateDoc(postRef, { likes: increment(-1) });
		} else {
		  updatedLikedPosts = [...likedPosts, postId];
  
		  const db = getFirestore();
		  const postRef = doc(db, "post-details", postId);
		  await updateDoc(postRef, { likes: increment(1) });
		}
		setLikedPosts(updatedLikedPosts);
  
		// Update the liked status of the post in the state
		setPosts((prevPosts) =>
		  prevPosts.map((post) => {
			if (post.id === postId) {
			  return { ...post, liked: !post.liked };
			}
			return post;
		  })
		);
	  } catch (error) {
		console.error("Error updating likes:", error);
	  }
	};
  
	const parseText = (content) => {
	  if (!content) return ""; // Check if content is undefined or null
  
	  const regex = /(http|https):\/\/(\S+)\.(\w{2,4})(:\d+)?(\/\S*)?/gi;
	  return content.replace(regex, '<a href="$&" target="_blank">$&</a>');
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
			  {/* <AiOutlineSearch style={{ height: "1rem" }} />
			  <input placeholder="HomePage News" type="HomePage" /> */}
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
			  <div className="plus" onClick={handleLogoutClick}>
				{/* Logout Icon */}
				<FaSignOutAlt fontSize="1.5rem" />
			  </div>
			</div>
		  </div>
		</div>
		<div className="post-composer">
		  <textarea
			value={text}
			onChange={(e) => setText(e.target.value)}
			placeholder={`What's on your mind, ${
			  currentUser ? currentUser.displayName : "User"
			}?`}
			w
		  />
		  <input
			id="photo-upload"
			type="file"
			onChange={handleImgChange}
			accept="image/*"
			style={{ display: "none" }}
		  />
		  <input
			id="file-upload"
			type="file"
			onChange={handleFileChange}
			accept=".pdf,.doc,.docx,.txt"
			style={{ display: "none" }}
		  />
  
		  <div className="buttons">
			<button>
			  <label htmlFor="photo-upload" className="custom-file-upload">
				Upload Image
			  </label>
			  {image && (
				<div style={{ position: "relative" }}>
				  <button
					onClick={handleCancel}
					className="cancel-button"
					style={{
					  position: "absolute",
					  top: "5px",
					  right: "5px",
					  padding: "2px",
					  backgroundColor: "white",
					  border: "none",
					  borderRadius: "50%",
					  cursor: "pointer",
					}}
				  >
					<FaTimes style={{ width: "10px", height: "10px" }} />
				  </button>
				  <img
					src={URL.createObjectURL(image)}
					alt="Preview"
					style={{
					  maxWidth: "100%",
					  maxHeight: "100%",
					  width: "700px",
					  height: "400px",
					}}
				  />
				</div>
			  )}
			</button>
			<button>
			  <label htmlFor="file-upload" className="custom-file-upload">
				Upload File
			  </label>
			  <br />
			  {file && (
				<div style={{ position: "relative" }}>
				  <button
					onClick={handleCancel}
					className="cancel-button"
					style={{
					  position: "absolute",
					  top: "5px",
					  right: "5px",
					  padding: "2px",
					  backgroundColor: "white",
					  border: "none",
					  borderRadius: "50%",
					  cursor: "pointer",
					}}
				  >
					<FaTimes style={{ width: "10px", height: "10px" }} />
				  </button>
				  <p>{file.name}</p>
				</div>
			  )}
			</button>
			<button type="submit" onClick={handlePostSubmit}>
			  Post
			</button>
		  </div>
		</div>
		
		<br />
		{/* Display posts */}
		{posts.map((post) => (
		  <div key={post.id} className="Posted">
			<div className="post">
			  <div className="poster">
				<div className="Simplilearn">
				  <img
					src="src/assets/homepage/Pink and Black Modern Initials Logo Design.png"
					alt="Img"
					style={{ height: "40px", width: "40px", borderRadius: "50%" }}
				  />
				  {/* <span>{post.author}</span> */}
				  
					<span>{post.author}</span>
				  
				  <br></br>
				</div>
				<span className="caption">
				  {new Date(post.timestamp).toLocaleString()}
				</span>
				{/* Display edit and delete options only if the current user is the author of the post */}
				
				  <div className="dropdown">
					<button onClick={() => handleEditPost(post.id, post.content)}>
					  Edit
					</button>
					<button onClick={() => handleDeletePost(post.id)}>
					  Delete
					</button>
				  </div>
				
				{editedPostId === post.id && (
				  <div className="edit-post-form">
					<form onSubmit={handlePostEditSubmit}>
					  <textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Edit your post..."
					  />
  
					  <div className="buttons">
						<button type="submit">Save</button>
						<button onClick={handleCancelEdit}>Cancel</button>
					  </div>
					</form>
				  </div>
				)}
			  </div>
  
			  <div
				className="caption"
				dangerouslySetInnerHTML={{ __html: parseText(post.content) }} // Parse text content for clickable links
			  ></div>
			  <br></br>
  
			  {post.imageUrl && (
				<img
				  src={post.imageUrl}
				  alt={`Uploaded Image`}
				  style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }}
				/>
			  )}
  
			  {post.fileUrl && (
				<div className="caption">
				  <p>{getFileName(post.fileUrl)}</p>
				  <a className="pdf-anchor" href={post.fileUrl}>
					{" "}
					See PDF{" "}
				  </a>
				</div>
			  )}
  
			  <div className="Comment">
				<div className="Like" onClick={() => handleLike(post.id)}>
				  {post.likes ? ( // Changed the condition to post.liked instead of likedPosts.includes(post.id)
					<FaRegThumbsUp color="blue" />
				  ) : (
					<FaRegThumbsUp color="grey" />
				  )}
				  Like
				</div>
  
				<div className="Like" onClick={() => handleOpenComment(post.id)}>
				  <FaCommentAlt color="grey" />
				  Comment
				</div>
  
				{commentModalOpen && (
				  <div className="comment-modal">
					<div className="modal-content">
					  <button
						onClick={handleCancel}
						className="cancel-button"
						style={{
						  position: "absolute",
						  top: "5px",
						  right: "5px",
						  padding: "2px",
						  backgroundColor: "white",
						  border: "none",
						  borderRadius: "50%",
						  cursor: "pointer",
						}}
					  >
						<FaTimes style={{ width: "10px", height: "10px" }} />
					  </button>
  
					  <h2>Enter your comment</h2>
					  <textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Write your comment here..."
					  />
  
					  <button onClick={() => handleCommentSubmit(text)}>
						Submit
					  </button>
					</div>
				  </div>
				)}
			  </div>
			  {postComments[post.id] && (
				<div>
				  {postComments[post.id].map((comment) => (
					<div key={comment.id} className="comment">
					  {/* <h4>Comments:</h4> */}
					  <span>{comment.author}:</span> {comment.content}
					  <FaTimes onClick={() => handleDeleteComment(comment.id,post.id)} />
					</div>
				  ))}
				</div>
			  )}
			</div>
		  </div>
		))}
	  </div>
	);
}

export default AdminHome;
