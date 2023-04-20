var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const propostaPressupost_controller = require("../controllers/propostaPressupostController");

router.get("/", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), propostaPressupost_controller.list);


router.get("/create", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.create_get);
router.post("/create", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.create_post);
router.post("/createMore", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.create_postMore);

router.get("/delete/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.delete_get);
router.post("/delete/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.delete_post);

router.get("/update/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.update_get);
router.post("/update/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.update_post);

router.get("/updateEstat/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.updateEstat_get);
router.post("/updateEstat/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaPressupost_controller.updateEstat_post);


module.exports = router;