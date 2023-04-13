var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");

const activitat_controller = require("../controllers/activitatController");



router.get("/", checkAuth, activitat_controller.list);


router.get("/create", checkAuth, activitat_controller.create_get);
router.post("/create", checkAuth, activitat_controller.create_post);

router.get("/delete/:id", checkAuth, activitat_controller.delete_get);
router.post("/delete/:id", checkAuth, activitat_controller.delete_post);

/*
router.get("/update/:id", llistatProveidor_controller.update_get);
router.post("/update/:id", llistatProveidor_controller.update_post);
*/

module.exports = router;