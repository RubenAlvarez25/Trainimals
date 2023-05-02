const connection = require("../config/db");
class AnimalController {
  addAnimalNavbar = (req, res) => {
    let sql = `SELECT name, trainer_id FROM trainer WHERE is_deleted=0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;

      res.render("addAnimalNavbar", { result });
    });
  };
  saveAnimalNavbar = (req, res) => {
    let {
      animal_name,
      animal_variety,
      animal_skill,
      animal_region,
      description,
      trainer_id,
    } = req.body;
    let sql = `INSERT INTO animal (trainer_id, animal_name, animal_variety, animal_skill, animal_region,description) VALUES ("${trainer_id}","${animal_name}","${animal_variety}","${animal_skill}","${animal_region}","${description}")`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO animal (trainer_id, animal_name, animal_variety, animal_skill, animal_region,description,animal_image) VALUES ("${trainer_id}","${animal_name}","${animal_variety}","${animal_skill}","${animal_region}","${description}","${img}")`;
    }
    connection.query(sql, (error, result) => {
      if (error) {
        if (error.code == "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
          res.render("errordos");
        } else {
          throw error;
        }
      } else {
        res.redirect(`/trainer/oneTrainer/${trainer_id}`);
      }
    });
  };

  saveAnimal = (req, res) => {
    let trainer_id = req.params.id;
    let { animal_name, animal_variety, animal_skill } = req.body;

    let sql = `INSERT INTO animal (trainer_id,animal_name,animal_variety,animal_skill) VALUES ( ${trainer_id}, "${animal_name}","${animal_variety}","${animal_skill}")`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO animal (trainer_id,animal_name,animal_variety,animal_skill,animal_image) VALUES ( ${trainer_id}, "${animal_name}","${animal_variety}","${animal_skill}","${img}")`;
    }
    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  deleteAnimal = (req, res) => {
    let { animal_id, trainer_id } = req.params;

    let sql = `DELETE FROM animal WHERE animal_id = ${animal_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;

      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  newEditView = (req, res) => {
    let animal_id = req.params.animal_id;

    let sql = `SELECT * FROM animal WHERE animal_id = ${animal_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("newEdit", { result });
    });
  };

  newEditAnimal = (req, res) => {
    let animal_id = req.params.animal_id;
    let trainer_id = req.params.trainer_id;

    let {
      animal_name,
      animal_variety,
      animal_skill,
      animal_region,
      description,
    } = req.body;

    let sql = `UPDATE animal SET animal_name = "${animal_name}",animal_variety= "${animal_variety}",animal_skill="${animal_skill}",animal_region="${animal_region}",description="${description}" WHERE animal_id = ${animal_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };
}

module.exports = new AnimalController();
