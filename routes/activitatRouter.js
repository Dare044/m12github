var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");
const activitat_controller = require("../controllers/activitatController");

router.get("/", checkAuth, checkCarrecAuth(['Admin']), activitat_controller.list);

router.get("/create", checkAuth, checkCarrecAuth(['Admin']), activitat_controller.create_get);
router.post("/create", checkAuth, checkCarrecAuth(['Admin']), activitat_controller.create_post);

router.get("/delete/:id", checkAuth, checkCarrecAuth(['Admin']), activitat_controller.delete_get);
router.post("/delete/:id", checkAuth, checkCarrecAuth(['Admin']), activitat_controller.delete_post);

/*
router.get("/update/:id", llistatProveidor_controller.update_get);
router.post("/update/:id", llistatProveidor_controller.update_post);
*/

module.exports = router;