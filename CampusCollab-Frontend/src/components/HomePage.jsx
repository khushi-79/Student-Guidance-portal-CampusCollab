import React, { useState, useEffect } from "react";
import "./homePage.css";
import { useNavigate, Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaFacebookMessenger,
  FaSignOutAlt,
  FaRegThumbsUp,
  FaCommentAlt,
  FaRegShareSquare,
  FaEdit,
  FaTrash,
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
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function HomePage() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [editedPostId, setEditedPostId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]); // State to store liked posts
  
//   // const handleLike = async (postId, likedPosts, setLikedPosts, db) => {
//   try {
//     // Check if the post is already liked by the current user
//     if (likedPosts.includes(postId)) {
//       // If already liked, unlike the post
//       const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
//       setLikedPosts(updatedLikedPosts);

//       // Fetch the current likes count
//       const postRef = doc(db, 'post-details', postId);
//       const postDoc = await getDoc(postRef);
//       const currentLikes = postDoc.data().likes || 0;

//       // Decrement the likes count
//       const updatedLikes = Math.max(currentLikes - 1, 0);

//       // Update the Firestore document with the decremented value
//       await updateDoc(postRef, { likes: updatedLikes });
//     } else {
//       // If not liked, like the post
//       setLikedPosts([...likedPosts, postId]);

//       // Fetch the current likes count
//       const postRef = doc(db, 'post-details', postId);
//       const postDoc = await getDoc(postRef);
//       const currentLikes = postDoc.data().likes || 0;

//       // Increment the likes count
//       const updatedLikes = currentLikes + 1;

//       // Update the Firestore document with the incremented value
//       await updateDoc(postRef, { likes: updatedLikes });
//     }
//   } catch (error) {
//     console.error('Error updating likes:', error);
//   }
// };

  const handleLike = async (postId) => {
    try {
      // Check if the post is already liked by the current user
      if (likedPosts.includes(postId)) {
        alert("You've already liked this post!");
        return;
      }
  
      const db = getFirestore();
      const postRef = doc(db, "post-details", postId);
      // Update the likes count in Firestore
      await updateDoc(postRef, { likes: increment(1) });
  
      // Add the postId to the likedPosts state to prevent multiple likes
      setLikedPosts([...likedPosts, postId]);
    } catch (error) {
      console.error("Error updating likes:", error);
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

  const handleEditPost = (postId, content, imageUrl) => {
    setText(content);
    setImage(imageUrl); // Set image URL for editing
    setEditedPostId(postId); // Track the edited post ID
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
        const postData = { id: doc.id, ...doc.data() };
        loadedPosts.push(postData);
      });
      setPosts(loadedPosts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      // If no image is selected, validate text input
      if (!text.trim()) {
        alert("Please enter some text before posting.");
        return;
      }
    } else {
      // If an image is selected, ensure text input is provided
      if (!text.trim()) {
        alert("Please enter some text to accompany the image.");
        return;
      }
    }

    try {
      const db = getFirestore();
      const postsCollection = collection(db, "post-details");

      // Prepare post data
      const postData = {
        timestamp: new Date().toISOString(),
        author: "anonymous",
        userId: currentUser.uid, // Save the current user's ID
      };

      if (image) {
        const imgRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imgRef, image);
        const downloadUrl = await getDownloadURL(imgRef);
        postData.imageUrl = downloadUrl;
      }

      if (text.trim()) {
        postData.content = text;
      }

      // Add post to Firestore
      await addDoc(postsCollection, postData);
      console.log("Post added successfully.");

      // Clear input fields after successful post
      setImage(null);
      setText("");

      // Reload posts
      loadPosts();
    } catch (error) {
      console.error("Error adding post:", error);
    }
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
        <div className="buttons">
          <button>
            <label htmlFor="photo-upload" className="custom-file-upload">
              Upload Image
            </label>
            {image && (
              <div className="image-preview">
                <img src={URL.createObjectURL(image)} alt="Preview" />
              </div>
            )}
          </button>
          <button type="submit" onClick={handlePostSubmit}>
            Post
          </button>
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
                <span>{post.author}</span>
                <br></br>
              </div>
              <span className="caption">
                {new Date(post.timestamp).toLocaleString()}
              </span>
              {/* Display edit and delete options only if the current user is the author of the post */}
              {currentUser && post.userId === currentUser.uid && (
                <div className="dropdown">
                  <button onClick={toggleDropdown}>More</button>
                  {isOpen && (
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown"
                        onClick={() => handleEditPost(post.id, post.content)}
                      >
                        Edit
                      </li>
                      <br></br>
                      <li
                        className="dropdown"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        {" "}
                        Delete
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="caption">{post.content}</div>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={`Uploaded Image`}
                style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }}
              />
            )}

            <div className="Comment">
              <div className="Like" onClick={() => handleLike(post.id)}>
                {likedPosts.includes(post.id) ? (
                  <FaRegThumbsUp color="blue" />
                ) : (
                  <FaRegThumbsUp color="grey" />
                )}
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
