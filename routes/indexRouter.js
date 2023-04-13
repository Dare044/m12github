var express = require("express");
var router = express.Router();
const checkAuth = require("../middlewares/auth");

router.get("/", checkAuth, function (req, res) {  
  res.render('home');
});


module.exports = router;