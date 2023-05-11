var express = require("express");
var router = express.Router();
var Personal = require("../models/personal");
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const recepcioComanda_controller = require("../controllers/recepcioComandaController");
var router = express.Router();
const { check, validationResult } = require('express-validator');

router.get("/", checkAuth, checkCarrecAuth(['Conserge','Admin']), recepcioComanda_controller.list);


router.get("/create", checkAuth, checkCarrecAuth(['Conserge','Admin']), recepcioComanda_controller.create_get);
router.post("/create", checkAuth, checkCarrecAuth(['Conserge','Admin']), [
    check ('dateRecepcio').not().isEmpty().withMessage('No has indicat cap data de recepció'),
    check ('llocRecepcio').not().isEmpty().withMessage("No has indicat cap lloc de recepció"),
    check ('tempsRebuda').not().isEmpty().withMessage('No has indicat temps de rebuda'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var list_Personal = await Personal.find();
        res.render('recepcioComandes/new', { personal_list:list_Personal, errors: errors.array(), data: req.body });
    } else {
        try {
            await recepcioComanda_controller.create_post(req, res);
        } catch (error) {
            console.log(error);
        }   
    }});

router.get("/delete/:id", checkAuth, checkCarrecAuth(['Conserge','Admin']), recepcioComanda_controller.delete_get);
router.post("/delete/:id", checkAuth, checkCarrecAuth(['Conserge','Admin']), recepcioComanda_controller.delete_post);

/*
router.get("/update/:id", recepcioComanda_controller.update_get);
router.post("/update/:id", recepcioComanda_controller.update_post);
*/

module.exports = router;