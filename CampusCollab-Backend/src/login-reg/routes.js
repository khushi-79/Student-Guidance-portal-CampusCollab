const express = require("express");
const user = require("./controller");
// route object created for routing
const router = express.Router();

router.post("/register", user.create);

router.post("/login", user.logedIn);



module.exports = router;