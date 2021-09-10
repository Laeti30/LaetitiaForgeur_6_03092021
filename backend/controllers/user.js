const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const emailScramble = require("email-scramble");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  // On vérifie l'adresse mail
  if (emailValidator.validate(req.body.email)) {
    // On encode l'adresse mail
    const encodedEmail = emailScramble.encode(req.body.email);
    bcrypt
      .hash(req.body.password, 10) // On hache le mot de passe 10 fois
      .then((hash) => {
        // On crée un nouvel utilisateur en utilisant notre schéma mongoose
        const user = new User({
          email: encodedEmail,
          // On récupère le mot de passe haché
          password: hash,
        });
        // On sauvegarde ce nouvel utilisateur en bdd
        user
          .save()
          .then(() => res.status(201).json({ message: "User created" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(400).json({ message: "Merci de saisir un email valide" });
  }
};

exports.login = (req, res, next) => {
  // on encode l'adresse mail
  const encodedEmail = emailScramble.encode(req.body.email);
  // On récupère notre utilisateur avec l'email vu qu'il est unique
  User.findOne({ email: encodedEmail })
    // On vérifie si on récupère un user ou non
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      // Si on trouve l'utilisateur, on compare le mot de passe envoyé avec celui stocké en bdd
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si les mots de passe ne correspondent pas
          if (!valid) {
            return res.status(401).json({ message: "Wrong password" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
