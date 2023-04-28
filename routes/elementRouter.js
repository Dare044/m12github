var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const element_controller = require("../controllers/elementController");

router.get("/", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.list);

router.get("/createPropostaPressupost", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.create_getPropostaPressupost);
router.post("/createPropostaPressupost", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.create_postPropostaPressupost);
router.post("/createMorePropostaPressupost", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.create_postMorePropostaPressupost);

router.get("/createPropostaNecessitat", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.create_getPropostaNecessitat);
router.post("/createPropostaNecessitat", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.create_postPropostaNecessitat);
router.post("/createMorePropostaNecessitat", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.create_postMorePropostaNecessitat);

router.get("/delete/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.delete_get);
router.post("/delete/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.delete_post);

router.get("/show/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), element_controller.show_get);

module.exports = router;