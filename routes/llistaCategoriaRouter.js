var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const llistaCategoria_controller = require("../controllers/llistaCategoriaController.js");
var router = express.Router();
const { check, validationResult } = require('express-validator');



router.get("/", checkAuth, llistaCategoria_controller.list);


router.get("/create", checkAuth, llistaCategoria_controller.create_get);
router.post("/create", checkAuth, [
    check ('concepte').not().isEmpty().withMessage('No has indicat cap concepte'),
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('descripcio').not().isEmpty().withMessage("No has indicat cap descripció")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('llistaCategories/new',{tipusProposta: "normal",  errors: errors.array(), data: req.body});
    } else {
        try {
            await llistaCategoria_controller.create_post(req, res);
        } catch (error) {
            console.log(error);
        }   
    }});

router.get("/delete/:id", checkAuth, llistaCategoria_controller.delete_get);
router.post("/delete/:id", checkAuth, llistaCategoria_controller.delete_post);

router.get("/createPropostaPressupost", checkAuth, llistaCategoria_controller.create_getPropostaPressupost);
router.post("/createPropostaPressupost", checkAuth, [
    check ('concepte').not().isEmpty().withMessage('No has indicat cap concepte'),
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('descripcio').not().isEmpty().withMessage("No has indicat cap descripció")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('llistaCategories/new',{tipusProposta: "pressupost",  errors: errors.array(), data: req.body});
    } else {
        try {
            await llistaCategoria_controller.create_postPropostaPressupost(req, res);
        } catch (error) {
            console.log(error);
        }
    }});

router.get("/createPropostaNecessitat", checkAuth, llistaCategoria_controller.create_getPropostaNecessitat);
router.post("/createPropostaNecessitat", checkAuth, [
    check ('concepte').not().isEmpty().withMessage('No has indicat cap concepte'),
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('descripcio').not().isEmpty().withMessage("No has indicat cap descripció")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('llistaCategories/new',{tipusProposta: "necessitat",  errors: errors.array(), data: req.body});
    } else {
        try {
            await llistaCategoria_controller.create_postPropostaNecessitat(req, res);
        } catch (error) {
            console.log(error);
        }
    }});

// router.get("/update/:id", llistaCategoria_controller.update_get);
// router.post("/update/:id", llistaCategoria_controller.update_post);

module.exports = router;