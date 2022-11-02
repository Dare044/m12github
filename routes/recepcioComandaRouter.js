var express = require("express");
var router = express.Router();

const recepcioComanda_controller = require("../controllers/recepcioComandaController");



router.get("/", recepcioComanda_controller.list);


router.get("/create", recepcioComanda_controller.create_get);
router.post("/create", recepcioComanda_controller.create_post);

router.get("/delete/:id", recepcioComanda_controller.delete_get);
router.post("/delete/:id", recepcioComanda_controller.delete_post);

/*
router.get("/update/:id", recepcioComanda_controller.update_get);
router.post("/update/:id", recepcioComanda_controller.update_post);
*/

module.exports = router;