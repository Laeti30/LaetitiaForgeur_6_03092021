// On importe le package multer
const multer = require("multer");

// Création d'un dictionnaire pour la gestion des mime-types
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// On crée un objet de configuration pour multer avec deux éléments : destination & filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // 1er argument null pour dire qu'il n'y a pas eu d'erreur, images pour le nom du dossier où on veut stocker les images
    callback(null, "images");
  },
  // on crée un nouveau nom de fichier pour éviter que deux fichiers aient le même nom
  filename: (req, file, callback) => {
    // on récupère le nom d'origine du fichier, on élimine les espaces qu'on remplace par des underscores
    const name = file.originalname.split(" ").join("_");
    // on récupère le nom du fichier sans extension
    const nameNoExtension = name.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, nameNoExtension + Date.now() + "." + extension);
  },
});

// On appelle la méthode multer avec notre objet storage, on utilise la méthode single car il s'agit d'un fichier unique et non d'un groupe de fichier et on précise qu'ils 'agit d'un fichier image
module.exports = multer({ storage: storage }).single("image");
