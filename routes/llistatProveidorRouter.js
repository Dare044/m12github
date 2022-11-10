var express = require("express");
var router = express.Router();

const llistatProveidor_controller = require("../controllers/llistatProveidorController");



router.get("/", llistatProveidor_controller.list);


router.get("/create", llistatProveidor_controller.create_get);
router.post("/create", llistatProveidor_controller.create_post);

router.get("/delete/:id", llistatProveidor_controller.delete_get);
router.post("/delete/:id", llistatProveidor_controller.delete_post);

/*
router.get("/update/:id", llistatProveidor_controller.update_get);
router.post("/update/:id", llistatProveidor_controller.update_post);
*/

module.exports = router;