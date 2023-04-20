var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const devolucio_controller = require("../controllers/devolucioController");

router.get("/", checkAuth, checkCarrecAuth(['Conserge','Admin']),  devolucio_controller.create_get);
router.post("/create", checkAuth, checkCarrecAuth(['Admin','Conserge']), devolucio_controller.create_post);

module.exports = router;