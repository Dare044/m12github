var express = require("express");
var router = express.Router();

const propostaNecessitat_controller = require("../controllers/propostaNecessitatController");



router.get("/", propostaNecessitat_controller.list);


router.get("/create", propostaNecessitat_controller.create_get);
router.post("/create", propostaNecessitat_controller.create_post);
router.post("/createMore", propostaNecessitat_controller.create_postMore);

router.get("/delete/:id", propostaNecessitat_controller.delete_get);
router.post("/delete/:id", propostaNecessitat_controller.delete_post);

router.get("/updateEstat/:id", propostaNecessitat_controller.updateEstat_get);
router.post("/updateEstat/:id", propostaNecessitat_controller.updateEstat_post);

// router.get("/update/:id", propostaPressupost_controller.update_get);
// router.post("/update/:id", propostaPressupost_controller.update_post);


module.exports = router;