import React, { useEffect, useState, useContext } from "react";
import { db } from "../database/firebase.config";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!data.chatId) {
      console.error("chatId is null or undefined.");
      return;
    }

    const chatRef = doc(db, "userChats", data.chatId);

    console.log(`Subscribing to Firestore path: userChats/${data.chatId}`);

    const initializeAndSubscribe = async () => {
      const docSnap = await getDoc(chatRef);
      if (!docSnap.exists()) {
        console.log("No chat document exists, initializing new chat document.");
        await setDoc(chatRef, { messages: [] });
      }
      
      const unsubscribe = onSnapshot(
        chatRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setMessages(snapshot.data().messages || []);
          } else {
            console.error("Document does not exist after initialization!");
          }
        },
        (error) => {
          console.error("Failed to fetch messages:", error);
        }
      );

      return unsubscribe;
    };

    initializeAndSubscribe()
      .then((unsubscribe) => {
        return () => unsubscribe();
      })
      .catch((error) => console.error("Error initializing chat:", error));
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={msg.senderId === data.userId ? "message right" : "message left"}
        >
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
