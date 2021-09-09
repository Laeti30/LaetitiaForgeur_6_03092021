module.exports = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  if (
    !sauceObject.name.match(
      /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{3,50}$/i
    ) ||
    !sauceObject.manufacturer.match(
      /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{3,50}$/i
    ) ||
    !sauceObject.mainPepper.match(
      /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{3,50}$/i
    )
  ) {
    res
      .status(400)
      .json({
        message:
          "Merci de saisir un nom valide (max 50 caractères, sans caractères spéciaux)",
      });
  } else if (
    !sauceObject.description.match(
      /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{3,500}$/i
    )
  ) {
    res.status(400).json({
      message:
        "Merci de saisir une description valide (max 500 caractères, sans caractères spéciaux)",
    });
  } else {
    next();
  }
};
