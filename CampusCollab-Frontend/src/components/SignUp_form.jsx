import React, { useState } from "react";
import "../components/signin_form.css";
import { Link } from "react-router-dom";
import {getDatabase,ref,set,push} from "firebase/database";


const SignUp_form = () => {
	// const [signUp, toggle] = React.useState(true);
	const [name,setName]=useState("")
	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")
	const [c_password,setCPassword]=useState("")
	const [role, setRole] = useState('student');

	const handleRoleChange = (e) => {
		setRole(e.target.value); // Update the role state based on the selected radio button
	  };

	const saveData = async()=>{
		const db = getDatabase(app);
		const newDocRef = push(ref(db, "signup"));
		set(newDocRef, {
		studentName: name,
		studentEmail: email,
		studentRole:role,
		studentPswd:password,
		confirm_pswd:c_password
		}).then( () => {
		alert("data saved successfully")
		}).catch((error) => {
		alert("error: ", error.message);
		})
	}

	return (
		<>
			<div className="main-container">
				<div class="sub-container">
					<div class="form-container">
						<p class="title">Sign Up</p>
						<form class="form">
							<div class="input-group">
								<label for="name">Name</label>
								<input type="text" naHme="name" id="name" placeholder="" value={name} onChange={(e)=>setName(e.target.value)} />
							</div>
							<div class="input-group">
								<label for="email">Email</label>
								<input type="text" name="email" id="email" placeholder="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
							</div>
							<div class="input-group">
								<label for="role">Role</label>
								<input type="radio" name="student" id="studentbt" value="student" checked={role === 'student'} onChange={handleRoleChange}/>
								<label>Student
								</label>
								<label>
								<input type="radio" name="alumni" id="alumnibt" value="alumni" checked={role === 'alumni'} onChange={handleRoleChange}/>
								Alumni
								</label>
								{/* <input type="text" naHme="name" id="name" placeholder="" value={name} onChange={()=>setName(e.target.value)} /> */}
							</div>

							<div class="input-group">
								<label for="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder=""
									value={password} 
									onChange={(e)=>setPassword(e.target.value)}
								/>
								<label for="c_password">Confirm Password</label>
								<input
									type="password"
									name="c_password"
									id="c_password"
									placeholder=""
									value={c_password} 
									onChange={(e)=>setCPassword(e.target.value)}
								/>
							</div>
							<button class="sign" onClick={saveData}>
								<Link to="/Search">SignIn</Link>
							</button>
						</form>
						<p class="signin">
							Already have an account?
							<Link to="/SignIn">SignIn</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp_form;