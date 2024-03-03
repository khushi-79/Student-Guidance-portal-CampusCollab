import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUp_form"; 
import SignInForm from "./components/Login_form";
import HeaderArea from "./components/HeaderArea/HeaderArea";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignUpForm />} />
				<Route path="/SignIn" element={<SignInForm />} />
				<Route path="/HeaderArea" element={<HeaderArea />} />

			</Routes>
		</BrowserRouter>
	);
}
