var express = require("express");
var router = express.Router();

const technicalBook_controller = require("../controllers/technicalBookController");



router.get("/", technicalBook_controller.list);


router.get("/create", technicalBook_controller.create_get);
router.post("/create", technicalBook_controller.create_post);
/*
router.get("/delete/:id", technicalBook_controller.delete_get);
router.post("/delete/:id", technicalBook_controller.delete_post);

router.get("/update/:id", technicalBook_controller.update_get);
router.post("/update/:id", technicalBook_controller.update_post);
*/

module.exports = router;