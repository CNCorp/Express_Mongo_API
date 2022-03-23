// vérification des saisies utilisateur

exports.articleValidation = (req, res, next) => {
  var regexarticle = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,-.]*$");
  // exclut tous ce qui n'est pas alphanumérique sauf ., et -
  if (
    !regexarticle.test(req.body.title) ||
    !regexarticle.test(req.body.content)
  ) {
    res.status(400).json({
      error:
        "Veillez à n'utiliser que des chiffres, des lettres et les caractères , . -",
    });
  } else {
    next();
  }
};

exports.authValidation = (req, res, next) => {
  var regexMail = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  );
  let email = req.body.email;
  if (regexMail.test(email)) {
    next();
  } else {
    res
      .status(400)
      .json({ error: "Veillez à utiliser une adresse email valide" });
  }
};
