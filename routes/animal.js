var express = require("express");
const uploadImage = require("../middleware/multer");
const animalController = require("../controllers/animalController");
var router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("PROXIMAMENTE ANIMAL");

//localHost:3000/animal/addAnimalNavbar
router.get("/addAnimalNavbar", animalController.addAnimalNavbar);

router.post(
  "/addAnimalNavbar",
  uploadImage("animals"),
  animalController.saveAnimalNavbar
);

router.post(
  "/addAnimal/:id",
  uploadImage("animals"),
  animalController.saveAnimal
);

//localHost:3000/animal/delete/:animal_id/:trainer_id
router.get("/delete/:animal_id/:trainer_id", animalController.deleteAnimal);

router.get("/newEdit/:animal_id", animalController.newEditView);

router.post("/newEdit/:animal_id/:trainer_id", animalController.newEditAnimal);

module.exports = router;
