const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    // Si le userId de la requête ne correspond pas à celui du token => Invalid user ID sinon on appelle next()
    if (req.body.userId && req.body.userId !== userId) {
      throw "UserId non valable";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Unauthenticated request" });
  }
};
