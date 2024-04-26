import React from "react";
import SignUpForm from "./components/SignUp_form";
import SignInForm from "./components/Login_form";
import HomePage from "./components/HomePage"; 
import Home from "./Chat/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignUpForm />} />
				<Route path="/SignIn" element={<SignInForm />} />
				<Route path="/HomePage" element={<HomePage />} />
				<Route path="/Home" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
