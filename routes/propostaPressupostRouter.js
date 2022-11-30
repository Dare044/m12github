var express = require("express");
var router = express.Router();

const propostaPressupost_controller = require("../controllers/propostaPressupostController");



router.get("/", propostaPressupost_controller.list);


router.get("/create", propostaPressupost_controller.create_get);
router.post("/create", propostaPressupost_controller.create_post);
router.post("/createMore", propostaPressupost_controller.create_postMore);

router.get("/delete/:id", propostaPressupost_controller.delete_get);
router.post("/delete/:id", propostaPressupost_controller.delete_post);

router.get("/update/:id", propostaPressupost_controller.update_get);
router.post("/update/:id", propostaPressupost_controller.update_post);

router.get("/updateEstat/:id", propostaPressupost_controller.updateEstat_get);
router.post("/updateEstat/:id", propostaPressupost_controller.updateEstat_post);


module.exports = router;