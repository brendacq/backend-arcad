const database = require('../database/connection');

class ProjectsController {
  index(req, res){
    const userId = req.userId;

    const dbRead = `SELECT * FROM projects WHERE id_user = ${userId};`
    database.query(dbRead, (err, result) => {
      if (err) return err;
      return res.json(result);
    })
  }

  show(req, res) {
    const id = req.params.id;

    const dbShow = `SELECT * FROM projects WHERE id = ${id}`;
    database.query(dbShow, (err, result) => {
      if (err) return err;
      return res.json(result);
    })
  }

  create(req, res) {
    const { name } = req.body;
    const userId = req.userId;

    const dbCreate = "INSERT INTO projects (name, id_user) VALUES (?, ?);";
    database.query(dbCreate, [name, userId], (err, result) => {
      if (err) return err;
      return res.json({message: "Projeto criado"});
    })
  }

  update(req, res){
    const projectId = req.params.id;
    const { name, description } = req.body;

    const dbUpdate = `UPDATE projects SET name = ?, description = ? WHERE id = ${projectId}`;
    database.query(dbUpdate, [name, description], (err, result) => {
      if (err) return err;
      return res.json({ name, description });
    })
  }

  delete(req, res){
    const projectId = req.params.id;

    const dbDelete = `DELETE FROM projects WHERE id = ${projectId}`;
    database.query(dbDelete, (err, result) => {
      if(err) return err;
      return res.json({message: "Projeto deletado!"});
    })
  }
}

module.exports = new ProjectsController()