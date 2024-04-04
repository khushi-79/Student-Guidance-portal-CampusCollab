const userService = require("./service");
const User = require("./model");


exports.create = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;

	// Validate request body
	if (!name || !email || !password || !confirmPassword) {
		return res.status(400).json({ message: "Fields are empty" });
	}

	try {
		const user = await userService.createUser(
			name,
			email,
			password,
			confirmPassword
		);
		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		// Check if the error message indicates that the user is already registered
		if (error.message === "User with this email already exists") {
			return res.status(400).json({ message: "User already registered" });
		} else {
			console.error("Error creating user:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}
};

exports.logedIn = async (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, (err, user) => {
		if (user) {
			if (password === user.password) {
				res.send({ message: "Login successfully", user: user });
			} else {
				res.send({ message: "Password didn't match" });
			}
		} else {
			res.send({ message: "User not registered" });
		}
	});
};