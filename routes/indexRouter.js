var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");
const checkCarrecAuth = require("../middlewares/roleCheck");

router.get("/", checkAuth, function (req, res) {  
  res.render('home');
});


module.exports = router;