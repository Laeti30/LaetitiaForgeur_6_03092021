const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordChecker = require("../middleware/passwordChecker");

router.post("/signup", passwordChecker, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
