const article = require("../models/article");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createarticle = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  const articleObject = req.body;
  const newarticle = new article({
    ...articleObject,
    userId: userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  newarticle
    .save()
    .then(() => res.status(201).json({ message: "article enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnearticle = (req, res, next) => {
  article
    .findOne({ _id: req.params.id })
    .then((article) => res.status(200).json(article))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyarticle = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  article.findOne({ _id: req.params.id }).then((art) => {
    if (art.userId === userId) {
      const articleObject = req.file
        ? {
            ...req.body.article,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      article
        .updateOne(
          { _id: req.params.id },
          { ...articleObject, _id: req.params.id }
        )
        .then(() => res.status(200).json({ message: "article modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(401).json({
        error: "Vous ne disposez pas des droits pour modifier cette article !",
      });
    }
  });
};

exports.deletearticle = (req, res, next) => {
  article
    .findOne({ _id: req.params.id })
    .then((article) => {
      // vérifier que l'utilisateur qui initie la requête est bien le créateur de l article et donc dispose des droits pour le supprimer
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      if (article.userId === userId) {
        // const filename = article.imageUrl.split("/images/")[1];
        // fs.unlink(`images/${filename}`, () => {
        article
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "article supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
        // });
      } else {
        res.status(401).json({
          error:
            "Vous ne disposez pas des droits pour supprimer cette article !",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllarticles = (req, res, next) => {
  article
    .find()
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(400).json({ error }));
};
