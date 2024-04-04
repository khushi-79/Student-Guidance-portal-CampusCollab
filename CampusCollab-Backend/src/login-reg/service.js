const User = require("./model");

exports.createUser = async (name, email, password) => {
	const user = new User({
		name,
		email,
		password,
	});
	return await user.save();
};
