const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const articleCtrl = require("../controllers/article");
const regex = require("../middleware/regex");

router.get("/",multer,  articleCtrl.getAllarticles);
router.post("/", articleCtrl.createarticle);
router.get("/:id", articleCtrl.getOnearticle);
router.put("/:id", articleCtrl.modifyarticle);
router.delete("/:id", articleCtrl.deletearticle);

module.exports = router;
