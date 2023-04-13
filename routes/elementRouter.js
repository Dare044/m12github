var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");

const element_controller = require("../controllers/elementController");

router.get("/", checkAuth, element_controller.list);

router.get("/createPropostaPressupost", checkAuth, element_controller.create_getPropostaPressupost);
router.post("/createPropostaPressupost", checkAuth, element_controller.create_postPropostaPressupost);
router.post("/createMorePropostaPressupost", checkAuth, element_controller.create_postMorePropostaPressupost);

router.get("/createPropostaNecessitat", checkAuth, element_controller.create_getPropostaNecessitat);
router.post("/createPropostaNecessitat", checkAuth, element_controller.create_postPropostaNecessitat);
router.post("/createMorePropostaNecessitat", checkAuth, element_controller.create_postMorePropostaNecessitat);

router.get("/delete/:id", checkAuth, element_controller.delete_get);
router.post("/delete/:id", checkAuth, element_controller.delete_post);

router.get("/show/:id", checkAuth, element_controller.show_get);

module.exports = router;