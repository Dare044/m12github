var express = require("express");
var router = express.Router();

const llistaCategoria_controller = require("../controllers/llistaCategoriaController.js");



router.get("/", llistaCategoria_controller.list);


router.get("/create", llistaCategoria_controller.create_get);
router.post("/create", llistaCategoria_controller.create_post);

router.get("/delete/:id", llistaCategoria_controller.delete_get);
router.post("/delete/:id", llistaCategoria_controller.delete_post);

// router.get("/update/:id", llistaCategoria_controller.update_get);
// router.post("/update/:id", llistaCategoria_controller.update_post);


module.exports = router;