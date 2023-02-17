var Carrec = require("../models/carrec");
const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
// const { validateCreate } = require("../validators/personals");

const personal_controller = require("../controllers/personalController");

router.get("/", personal_controller.list);


router.get("/create", personal_controller.create_get);
router.post("/create", [
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('cognoms').not().isEmpty().withMessage('No has indicat cap cognom'),
    check ('gmail').not().isEmpty().withMessage("No has indicat cap email").isEmail().withMessage("L'email no té un format correcte"),
    check ('contrasenya').not().isEmpty().withMessage('No has indicat contrasenya'),
    check ('familia').not().isEmpty().withMessage('Nos han indicat cap familia'),
    check ('carrecs').not().isEmpty().withMessage('No has indicat cap carrec'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var carrec_list = await Carrec.find();
        res.render('personals/new', { carrec_list:carrec_list, errors: errors.array(), data: req.body });
    } else {
        personal_controller.create_post
    }});

router.get("/delete/:id", personal_controller.delete_get);
router.post("/delete/:id", personal_controller.delete_post);

router.get("/update/:id", personal_controller.update_get);
router.post("/update/:id", personal_controller.update_post);


module.exports = router;