var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const fullComanda_controller = require("../controllers/fullComandaController");

router.get("/", checkAuth, checkCarrecAuth(['Conserge','Admin']), fullComanda_controller.list);

router.get("/delete/:id", checkAuth, checkCarrecAuth(['Conserge','Admin']), fullComanda_controller.delete_get);
router.post("/delete/:id", checkAuth, checkCarrecAuth(['Conserge','Admin']), fullComanda_controller.delete_post);

router.get("/show/:id", checkCarrecAuth(['Conserge','Admin']), checkAuth, fullComanda_controller.show_get);

module.exports = router;