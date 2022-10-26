var express = require("express");
var router = express.Router();

const personal_controller = require("../controllers/personalController");



router.get("/", personal_controller.list);


router.get("/create", personal_controller.create_get);
router.post("/create", personal_controller.create_post);

router.get("/delete/:id", personal_controller.delete_get);
router.post("/delete/:id", personal_controller.delete_post);

router.get("/update/:id", personal_controller.update_get);
router.post("/update/:id", personal_controller.update_post);


module.exports = router;