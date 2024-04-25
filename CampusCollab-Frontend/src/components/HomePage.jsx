import React, { useState } from "react";
import "./homePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineSearch, AiFillHome, AiOutlineWallet } from "react-icons/ai";
import {
  FaPlusCircle,
  FaFacebookMessenger,
  FaSignOutAlt,
  FaBell,
  FaUsers,
  FaRegThumbsUp,
  FaCommentAlt,
  FaRegShareSquare,
} from "react-icons/fa";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";
import {
  ref,
  getMetadata,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../database/firebase.config"; // Import storage reference

function HomePage() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  // const [imgUrls, setImgUrls] = useState([]);

  // const handleImgChange = async (e) => {
  //   const file = e.target.files[0];

  //   if (file && file.type.startsWith("image/")) {
  //     const imgRef = ref(storage, `images/${file.name}`); // Upload to 'images' folder with file name
  //     try {
  //       const uploadTask = await uploadBytes(imgRef, file);
  //       // const timestamp = new Date().toISOString(); 
  //       // await uploadBytes(imgRef, file); // Upload image file to Firebase Storage
  //       const downloadUrl = await getDownloadURL(imgRef);

  //       // Save image details to Firestore including the timestamp
  //       const db = getFirestore();
  //       const postsCollection = collection(db, "post-details");
  //       await addDoc(postsCollection, {
  //         content: text,
  //         imageUrl: downloadUrl,
  //         timestamp: new Date().toISOString(),
  //         author: "anonymous",
  //       });

  //       console.log("Image uploaded successfully.");
  //       setText("");
  //       loadImages(); // Reload images after upload
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     }
  //   } else {
  //     alert("Please select a valid image file.");
  //   }
  // };

  const handleLogoutClick = () => {
    navigate("/SignIn");
  };

  const handleDeletePost = async (postId) => {
    const db = getFirestore();
    const postRef = doc(db, "post-details", postId);

    try {
      // Mark the post as deleted in the database
      await updateDoc(postRef, {
        deleted: true,
      });

      // Reload posts
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
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

  

  // const handleVideo = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   setPostType("video"); // Set post type to video
  // };

  // const handlePostSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!text.trim() && !selectedFile) return;

  //   if (!image || !text.trim()) {
  //     alert("Please select an image and enter text.");
  //     return;
  //   }
  //   const db = getFirestore();

  //   try {
  //     const postsCollection = collection(db, "post-details");
  //     const newPostRef = await addDoc(postsCollection, {
  //       content: text,
  //       timestamp: new Date().toISOString(),
  //       author: "anonymous",
  //     });

  //     const newPost = {
  //       id: newPostRef.id,
  //       content: text,
  //       timestamp: new Date().toISOString(),
  //       author: "anonymous",
  //     };

  //     setPosts([newPost, ...posts]);
  //     setText("");
  //     setSelectedFile(null);
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };


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
          <div className="HomePage">
            {/* <AiOutlineSearch style={{ height: "1rem" }} /> */}
            {/* <input placeholder="HomePage News" type="HomePage" /> */}
          </div>
          <div className="middle-header"></div>
          <div className="svg-icons">
            <div className="plus">
              <Link to="/HomePage">
              <FaPlusCircle fontSize="1.5rem" />
              </Link>
            </div>
            <div className="plus">
              <Link to="/chat">
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
          placeholder="What's on your mind?"
        />
        <input
          id="photo-upload"
          type="file"
          onChange={handleImgChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        
        <div className="buttons">
          <button>
            {/* <label htmlFor="photo-upload" className="custom-file-upload">
              <input
                id="photo-upload"
                type="file"
                onChange={handleImgChange}
                style={{ display: "none" }}
              />
              Photo
            </label> */}
            <label htmlFor="photo-upload" className="custom-file-upload">
          Upload Image
        </label>
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}
          </button>
          {/* <button>
            <label htmlFor="video-upload" className="custom-file-upload">
              <input
                id="video-upload"
                type="file"
                onChange={handleImgChange}
                accept="video/*"
                style={{ display: "none" }}
              />
              Video
            </label>
          </button> */}
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
            <span className="caption">{new Date(post.timestamp).toLocaleString()}</span>
            </div>

            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            <div className="caption">{post.content}</div>
            
            

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={`Uploaded Image`}
                style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }}
              />
            )}

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
