var express = require("express");
var router = express.Router();

const llistaCategoria_controller = require("../controllers/llistaCategoriaController.js");
var router = express.Router();
const { check, validationResult } = require('express-validator');



router.get("/", llistaCategoria_controller.list);


router.get("/create", llistaCategoria_controller.create_get);
router.post("/create", [
    check ('concepte').not().isEmpty().withMessage('No has indicat cap concepte'),
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('descripcio').not().isEmpty().withMessage("No has indicat cap descripció")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('llistaCategories/new',{tipusProposta: "normal",  errors: errors.array(), data: req.body});
    } else {
        llistaCategoria_controller.create_post
    }});

router.get("/delete/:id", llistaCategoria_controller.delete_get);
router.post("/delete/:id", llistaCategoria_controller.delete_post);

router.get("/createPropostaPressupost", llistaCategoria_controller.create_getPropostaPressupost);
router.post("/createPropostaPressupost", [
    check ('concepte').not().isEmpty().withMessage('No has indicat cap concepte'),
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('descripcio').not().isEmpty().withMessage("No has indicat cap descripció")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('llistaCategories/new',{tipusProposta: "pressupost",  errors: errors.array(), data: req.body});
    } else {
        llistaCategoria_controller.create_postPropostaPressupost
    }});

router.get("/createPropostaNecessitat", llistaCategoria_controller.create_getPropostaNecessitat);
router.post("/createPropostaNecessitat", [
    check ('concepte').not().isEmpty().withMessage('No has indicat cap concepte'),
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('descripcio').not().isEmpty().withMessage("No has indicat cap descripció")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('llistaCategories/new',{tipusProposta: "necessitat",  errors: errors.array(), data: req.body});
    } else {
        llistaCategoria_controller.create_postPropostaNecessitat
    }});

// router.get("/update/:id", llistaCategoria_controller.update_get);
// router.post("/update/:id", llistaCategoria_controller.update_post);

module.exports = router;