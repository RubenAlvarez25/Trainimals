const connection = require("../config/db");
const bcrypt = require("bcrypt");
class TrainerController {
  //Vista todos entrenadores
  viewAllTrainers = (req, res) => {
    let sql = `SELECT * FROM trainer WHERE is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allTrainers", { result });
    });
  };

  // Vista un entrenador
  viewOneTrainer = (req, res) => {
    let trainer_id = req.params.id;
    let sqlTrainer = `SELECT * FROM trainer WHERE is_deleted = 0 AND trainer_id = ${trainer_id}`;
    let sqlAnimal = `SELECT * FROM animal WHERE is_deleted = 0 AND trainer_id = ${trainer_id}`;

    connection.query(sqlTrainer, (errorTrainer, resultTrainer) => {
      if (errorTrainer) throw errorTrainer;

      connection.query(sqlAnimal, (errorAnimal, resultAnimal) => {
        if (errorAnimal) throw errorAnimal;

        res.render("oneTrainer", { resultTrainer, resultAnimal });
      });
    });
  };

  //Registro
  viewRegisterForm = (req, res) => {
    res.render("register", { message: "" });
  };

  register = (req, res) => {
    let { name, last_name, phone, email, password, motivation } = req.body;

    let img = "";
    if (req.file != undefined) {
      img = req.file.filename;
    } else {
      img = "picture.jpg";
    }
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      let sql = `INSERT INTO trainer (name,last_name,phone,email,password,motivation,picture) VALUES ("${name}","${last_name}","${phone}","${email}","${hash}","${motivation}","${img}")`;

      connection.query(sql, (error, result) => {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            res.render("register", { message: "Email already in use" });
          } else if (error.code == "ER_DATA_TOO_LONG") {
            res.render("register", {
              message: "sorry... telephone number is not correct",
            });
          } else {
            throw error;
          }
        } else {
          res.render("success");
        }
      });
    });
  };

  //Login
  viewloginForm = (req, res) => {
    res.render("loginForm", { message: "" });
  };
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM trainer WHERE email = '${email}' AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (resultCompare) {
            res.redirect(`/trainer/oneTrainer/${result[0].trainer_id}`);
          } else {
            res.render("loginForm", { message: "ooops... " });
          }
        });
      } else {
        res.render("loginForm", { message: "ooops... " });
      }
    });
  };

  //Edit
  viewEditTrainerForm = (req, res) => {
    let trainer_id = req.params.trainer_id;
    let sql = `SELECT * FROM trainer WHERE trainer_id = ${trainer_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editTrainer", { result });
    });
  };

  saveEditTrainer = (req, res) => {
    let trainer_id = req.params.trainer_id;
    let { name, last_name, phone, email, motivation } = req.body;

    let sql = `UPDATE trainer SET name = "${name}", last_name = "${last_name}", phone = "${phone}",email = "${email}", motivation = "${motivation}" WHERE trainer_id = ${trainer_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE trainer SET name = "${name}", last_name = "${last_name}", phone = "${phone}",email = "${email}", motivation = "${motivation}", picture = "${img}" WHERE trainer_id = ${trainer_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  //Borrar

  trainerDelete = (req, res) => {
    let trainer_id = req.params.trainer_id;
    let sql = `DELETE FROM trainer WHERE trainer_id = ${trainer_id}`;

    connection.query(sql, (error, result) => {
      res.render("delete");
    });
  };
}

module.exports = new TrainerController();
