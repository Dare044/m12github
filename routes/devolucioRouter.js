var express = require("express");
var router = express.Router();

const devolucio_controller = require("../controllers/devolucioController");



router.get("/", devolucio_controller.list);


router.get("/create", devolucio_controller.create_get);
router.post("/create", devolucio_controller.create_post);

router.get("/delete/:id", devolucio_controller.delete_get);
router.post("/delete/:id", devolucio_controller.delete_post);

/*
router.get("/update/:id", llistatProveidor_controller.update_get);
router.post("/update/:id", llistatProveidor_controller.update_post);
*/

module.exports = router;