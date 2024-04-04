import React from "react";
import SignUpForm from "./components/SignUp_form";
import SignInForm from "./components/Login_form";
import Search from "./search/search"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignUpForm />} />
				<Route path="/SignIn" element={<SignInForm />} />
				<Route path="/Search" element={<Search />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
