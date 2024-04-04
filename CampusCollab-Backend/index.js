const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = require("./src/config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connection done with database");
	})
	.catch((err) => {
		console.log("error in db connection ", err);
		process.exit();
	});

const registerRoute = require("./src/login-reg/routes");
app.use("/api", registerRoute);


// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))