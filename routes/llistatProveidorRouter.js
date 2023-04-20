var Activitat = require("../models/activitat");
var LlistatProveidor = require("../models/llistatProveidor");
var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

const llistatProveidor_controller = require("../controllers/llistatProveidorController");

router.get("/", checkAuth, checkCarrecAuth(['Conserge','Admin']), llistatProveidor_controller.list);


router.get("/create", checkAuth, checkCarrecAuth(['Conserge','Admin']), llistatProveidor_controller.create_get);
router.post("/create", checkAuth, checkCarrecAuth(['Conserge','Admin']), [
    check ('Cif').not().isEmpty().withMessage('No has indicat cap CIF'),
    check ('nom').not().isEmpty().withMessage('No has indicat cap nom'),
    check ('idActivitat').not().isEmpty().withMessage("No has indicat cap activitat"),
    check ('ubicacio').not().isEmpty().withMessage('No has indicat cap ubicació'),
    check ('contacte').not().isEmpty().withMessage('No has indicat cap contacto'),
    check ('email').not().isEmpty().withMessage("No has indicat cap email").isEmail().withMessage("L'email no té un format correcte"),
    check ('numDeficiencies').not().isEmpty().withMessage('No has indicat cap deficiencia'),
    check ('numIncorreccions').not().isEmpty().withMessage('No has indicat cap incorrecció'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var activitat_list = await Activitat.find();
        res.render('llistatProveidors/new', { activitat_list:activitat_list, errors: errors.array(), data: req.body });
    } else {
        LlistatProveidor.create(req.body, async function (error, newLlistatProveidor)  {
            if(error){
                console.log(error)
                var activitat_list = await Activitat.find();
                res.render('llistatProveidors/new',{activitat_list:activitat_list})
            }else{             
                res.redirect('/llistatProveidor')
            }
        })  
    }});

router.get("/delete/:id", checkAuth, checkCarrecAuth(['Conserge','Admin']), llistatProveidor_controller.delete_get);
router.post("/delete/:id", checkAuth, checkCarrecAuth(['Conserge','Admin']), llistatProveidor_controller.delete_post);

/*
router.get("/update/:id", llistatProveidor_controller.update_get);
router.post("/update/:id", llistatProveidor_controller.update_post);
*/

module.exports = router;