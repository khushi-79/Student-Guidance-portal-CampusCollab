import React, {Component} from "react";
import "../components/signin_form.css";
import { Link } from "react-router-dom";


const Signin_form = () => {
	const [signIn, toggle] = React.useState(true);

	return (
		<>
			<div className="main-container">
				<div className="sub-container">
					<div class="form-container">
						<p class="title">Login</p>
						<form class="form">
							<div class="input-group">
								<label for="email">Email</label>
								<input type="text" name="email" id="email" placeholder="" />
							</div>
							<div class="input-group">
								<label for="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder=""
								/>
							</div>
							<button class="sign">
								<Link to="/Search">Login</Link>
							</button>
						</form>
						<p class="signup">
							Don't have an account? <Link to="/">Sign Up</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signin_form;
