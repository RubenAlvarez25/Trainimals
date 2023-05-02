const connection = require("../config/db");
class IndexController {
  // Muestra la vista home
  viewHome = (req, res) => {
    let sql = `SELECT name, picture, trainer.trainer_id, motivation, COUNT(*) as many
    FROM trainer 
      JOIN animal ON trainer.trainer_id = animal.trainer_id
        GROUP BY trainer.trainer_id 
        HAVING COUNT(*) >= 2 
        ORDER BY RAND()
        LIMIT 3;`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("", { result });
    });
  };
}

module.exports = new IndexController();
