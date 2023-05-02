var express = require("express");
const uploadImage = require("../middleware/multer");
const trainerController = require("../controllers/trainerController");
var router = express.Router();

//VISTAS CON MUESTRA DE INFORMACION

//localHost:3000/trainer
router.get("/", trainerController.viewAllTrainers);

//localHost:3000/trainer/oneTrainer/:id
router.get("/oneTrainer/:id", trainerController.viewOneTrainer);

//REGISTRO

//localHost:3000/trainer/register
router.get("/register", trainerController.viewRegisterForm);

//localHost:3000/trainer/register
router.post("/register", uploadImage("trainer"), trainerController.register);

//LOGIN

//localHost:3000/trainer/login
router.get("/login", trainerController.viewloginForm);

//localHost:3000/trainer/login
router.post("/login/", trainerController.login);

//EDIT

//localHost:3000/trainer/editTrainer/:id
router.get("/editTrainer/:trainer_id", trainerController.viewEditTrainerForm);

//localHost:3000/trainer/editTrainer/:id
router.post(
  "/editTrainer/:trainer_id",
  uploadImage("trainer"),
  trainerController.saveEditTrainer
);

//BORADO
router.get("/delete/:trainer_id", trainerController.trainerDelete);

module.exports = router;
