const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// On applique le validator au schéma pour qu'un mail ne puisse être utilisé que pour un seul compte
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
