import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx"
import { ChatContextProvider } from "./context/ChatContext"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<ChatContextProvider>
				<App />
			</ChatContextProvider>
		</AuthProvider>
	</React.StrictMode>
);