const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, sauceCtrl.createSauce); // Créer une nouvelle sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce); // Modifier une sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce); // Supprimer une sauce
router.get("/:id", auth, sauceCtrl.getOneSauce); // Récupérer une sauce
router.get("/", auth, sauceCtrl.getAllSauces); // Récupérer toutes les sauces
router.post("/:id/like", auth, sauceCtrl.like); // Définir le statut "like"

module.exports = router;
