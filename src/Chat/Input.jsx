import React, { useContext, useState } from "react";
// import Img from "../assets/chat-img/img.png";
// import Attach from "../assets/chat-img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
	getDoc,
} from "firebase/firestore";
import { db, storage } from "../database/firebase.config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async () => {
		if (!data.chatId || data.chatId === "null") {
			console.error("Chat ID is undefined or null.");
			return;
		}

		const messageId = uuid();
		const messagePayload = {
			id: messageId,
			text,
			senderId: currentUser.uid,
		};

		if (img) {
			const storageRef = ref(storage, `images/${messageId}`);
			const uploadTask = uploadBytesResumable(storageRef, img);

			uploadTask.on(
				"state_changed",
				null,
				(error) => {
					console.error("Upload failed:", error);
				},
				async () => {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					await sendMessage({ ...messagePayload, image: downloadURL });
				}
			);
		} else {
			await sendMessage(messagePayload);
		}
	};

	const sendMessage = async (payload) => {
		const chatDocRef = doc(db, "userChats", data.chatId);

		try {
			const docSnap = await getDoc(chatDocRef);
			if (!docSnap.exists()) {
				await setDoc(chatDocRef, {
					messages: [payload],
					updatedAt: serverTimestamp(),
				});
			} else {
				await updateDoc(chatDocRef, {
					messages: arrayUnion(payload),
					updatedAt: serverTimestamp(),
				});
			}
			setText("");
			setImg(null);
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	};


	return (
		<div className="input">
			<input
				type="text"
				placeholder="Type something..."
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<div className="send">
				{/* <img src={Attach} alt="Attach" /> */}
				<input
					type="file"
					style={{ display: "none" }}
					id="file"
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label htmlFor="file">
					{/* <img src={Img} alt="Upload" /> */}
				</label>
				<button onClick={handleSend} disabled={!text && !img}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Input;
