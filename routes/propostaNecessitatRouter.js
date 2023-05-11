var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const propostaNecessitat_controller = require("../controllers/propostaNecessitatController");

router.get("/", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin','Director']), propostaNecessitat_controller.list);


router.get("/create", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.create_get);
router.post("/create", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.create_post);
router.post("/createMore", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.create_postMore);

router.get("/delete/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.delete_get);
router.post("/delete/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.delete_post);

router.get("/updateEstat/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.updateEstat_get);
router.post("/updateEstat/:id", checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.updateEstat_post);

router.get("/show/:id",  checkAuth, checkCarrecAuth(['Responsable','CapDeDepartament','Admin']), propostaNecessitat_controller.show_get);
// router.get("/update/:id", propostaPressupost_controller.update_get);
// router.post("/update/:id", propostaPressupost_controller.update_post);


module.exports = router;