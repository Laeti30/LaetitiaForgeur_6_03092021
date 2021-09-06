const Sauce = require("../models/Sauce");
// Package de Node qui nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers.
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.Sauce);
  delete sauceObject._id;
  // On crée une nouvelle sauce en utilisant notre schéma mongoose
  const sauce = new Sauce({
    ...sauceObject,
    // On génère l'url de l'image
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "New sauce saved" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  // Avec un ternaire, on checke si dans la modification, on a un req.file (image).
  // S'il existe, on récupère la chaine de caractères, on la parse en objet et on modifie l'imageURL
  // S'il n'existe pas, on fait une copie de req.body
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  // 1 er argument, on récupère l'ancien objet - 2eme argument, notre nouvel objet
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce updated" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  // On récupère l'objet dans la bdd
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // On extrait le nom du fichier à supprimer
      const filename = sauce.imageUrl.split("/images/")[1];
      // On supprime le fichier avec fs.unlink et dans le callback (2e paramètre) on fait la suppression de l'objet dans la bdd
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce deleted" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    // Error404 pour objet non trouvé
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
