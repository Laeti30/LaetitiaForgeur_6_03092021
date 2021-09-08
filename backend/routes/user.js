const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordChecker = require("../middleware/passwordChecker");
const limitAttempt = require("../middleware/loginAttempt");

router.post("/signup", passwordChecker, userCtrl.signup);
router.post("/login", limitAttempt, userCtrl.login);

module.exports = router;
