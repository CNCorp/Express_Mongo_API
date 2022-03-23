const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bouncer = require("express-bouncer")(120000, 1.8e6, 5);

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        rights: 0,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((err) => res.status(401).json({ err }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  User.find()
    .then((u) => res.status(200).json(u))
    .catch((err) => res.status(401).json({ err }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id, userRights: user.rights },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            ),
          });
          bouncer.reset(req);
        })
        .catch((error) => res.status(400).json({ error }));
      // pb ds la req
    })
    .catch((error) => res.status(500).json({ error }));
};
