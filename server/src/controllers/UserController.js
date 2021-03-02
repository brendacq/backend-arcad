const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../database/connection");

class UserController {
  create(req, res) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    const dbCreate =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?);";
    bcrypt.hash(user.password, 10, (err, hash) => {
      database.query(dbCreate, [user.name, user.email, hash], (err, result) => {
        if (err) return err;
      });
    });

    return res.json({message: "Usuário cadastrado com sucesso!"});
    // console.log(user);
  }

  login(req, res) {
    const { email, password } = req.body;

    const dbRead = `SELECT * FROM users WHERE email = '${email}'`;

    database.query(dbRead, (err, result) => {
      if (err) return err;
      if (result.length < 1) {
        res.status(409).json({message: "Não autorizado!"});
      } else {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (error) return error;
          // if (response) {
          //   //console.log(`Usuário ${result[0].name} encontrado! `);
          //   //res.send("Usuário encontrado!");
          // }
        });

        const token = jwt.sign(
          {
            userId: result[0].id,
            email: result[0].email,
          },
          "secret_key",
          { expiresIn: "1h" }
        );

        return res.json({ auth: true, token });
      }
    });
  }

  logout(req, res) {
    return res.json({ auth: false, token: null });
  }

  delete(req, res) {
    const userId = req.params.id;
    if (userId != req.userId){
      return res.status(401).json({message: "Oops! You don't have permission to do that!"})
    }

    const dbDeleteUser =
      `DELETE FROM users WHERE id = ${userId};`
    database.query(dbDeleteUser, (err, result) => {
      if(err) return err;
      return res.json({message: "User deleted!"});
    });
  }
}

module.exports = new UserController();
