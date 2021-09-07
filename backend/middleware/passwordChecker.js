const passwordSchema = require("../models/Password");

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit contenir au min 10 caractères dont au moins un chiffre, une majuscule, une minuscule et pas d'espace",
    });
  } else {
    next();
  }
};
