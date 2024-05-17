import React from "react";
import SignUpForm from "./components/SignUp_form";
import SignInForm from "./components/Login_form";
import HomePage from "./components/HomePage"; 
import Home from "./Chat/Home";
import AdminLogin from "./Admin/Admin_login";
import AdminSignUp from "./Admin/Admin_singin";
import AdminPage from "./Admin/AdminPage";
import Users from './Admin/UserManagement';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
			<Route path="/" element={<SignUpForm />} />
				<Route path="/Login" element={<SignInForm />} />
				<Route path="/HomePage" element={<HomePage />} />
				<Route path="/Home" element={<Home />} />
				<Route path="/AdminLogin" element={<AdminLogin />} />
				<Route path="/AdminSignup" element={<AdminSignUp />} />
				<Route path="/AdminHome" element={<AdminPage />} />
				<Route path="/Users" element={<Users />} />
				
			</Routes>
		</BrowserRouter>
	);
}

export default App;
