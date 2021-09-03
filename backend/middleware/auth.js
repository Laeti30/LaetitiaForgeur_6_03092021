const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    // Si le userId de la requête ne correspond pas à celui du token => Invalid user ID sinon on appelle next()
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    // Si on reçoit une erreur, on l'envoie, sinon on envoie un message
    res.status(401).json({ error: error || "Unauthenticated request" });
  }
};
