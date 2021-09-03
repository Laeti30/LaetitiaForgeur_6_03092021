const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    // On hache le mot de passe 10 fois
    .hash(req.body.password, 10)
    .then((hash) => {
      // On crée un nouvel utilisateur en utilisant notre schéma mongoose
      const user = new User({
        email: req.body.email,
        // On récupère le mot de passe haché
        password: hash,
      });
      // On sauvegarde ce nouvel utilisateur en bdd
      user
        .save()
        .then(() => res.status(201).json({ message: "User created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // On récupère notre utilisateur avec l'email vu qu'il est unique
  User.findOne({ email: req.body.email })
    // On vérifie si on récupère un user ou non
    .then((user) => {
      // Si on ne trouve pas d'utilisateur correspondant en bdd
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      // Si on trouve l'utilisateur, on compare le mot de passe envoyé avec celui stocké en bdd
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si les mots de passent ne correspondent pas
          if (!valid) {
            return res.status(401).json({ error: "Wrong password" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userID: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.Status(500).json({ error }));
    })
    .catch((error) => res.Status(500).json({ error }));
};
