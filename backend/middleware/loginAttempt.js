const rateLimit = require("express-rate-limit");

const limitAttempt = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5, // limite chaque IP à 5 requêtes par windowMs
  message:
    "Vous avez atteint le nombre maximal de tentatives autorisées. Merci de réessayer dans une heure ",
});

module.exports = limitAttempt;
