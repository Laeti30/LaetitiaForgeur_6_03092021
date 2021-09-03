const Sauce = require("../models/Sauce");

exports.createSauce = (req, res, next) => {
  delete req.body._id;
  // On crée une nouvelle sauce en utilisant notre schéma mongoose
  const sauce = new Sauce({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "New sauce saved" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  // 1 er argument, on récupère l'ancien objet - 2eme argument, notre nouvel objet
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce updated" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce deleted" }))
    .catch((error) => res.status(400).json({ error }));
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
