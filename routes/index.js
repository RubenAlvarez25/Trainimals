var express = require("express");
const ndexController = require("../controllers/indexController");
const indexController = require("../controllers/indexController");
var router = express.Router();

// BASE localhost:3000
router.get("/", indexController.viewHome);

module.exports = router;
