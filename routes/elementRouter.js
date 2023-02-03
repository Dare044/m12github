var express = require("express");
var router = express.Router();

const element_controller = require("../controllers/elementController");

router.get("/", element_controller.list);

router.get("/createPropostaPressupost", element_controller.create_getPropostaPressupost);
router.post("/createPropostaPressupost", element_controller.create_postPropostaPressupost);
router.post("/createMorePropostaPressupost", element_controller.create_postMorePropostaPressupost);

router.get("/createPropostaNecessitat", element_controller.create_getPropostaNecessitat);
router.post("/createPropostaNecessitat", element_controller.create_postPropostaNecessitat);
router.post("/createMorePropostaNecessitat", element_controller.create_postMorePropostaNecessitat);

router.get("/delete/:id", element_controller.delete_get);
router.post("/delete/:id", element_controller.delete_post);

router.get("/show/:id", element_controller.show_get);

module.exports = router;