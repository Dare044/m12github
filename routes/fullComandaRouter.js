var express = require("express");
var router = express.Router();

const fullComanda_controller = require("../controllers/fullComandaController");



router.get("/", fullComanda_controller.list);

// router.get("/create", fullComanda_controller.create_get);
// router.post("/create", fullComanda_controller.create_post);

// router.get("/delete/:id", fullComanda_controller.delete_get);
// router.post("/delete/:id", fullComanda_controller.delete_post);

// router.get("/update/:id", fullComanda_controller.update_get);
// router.post("/update/:id", fullComanda_controller.update_post);


module.exports = router;