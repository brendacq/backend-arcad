const express = require("express");

const UserController = require('./controllers/UserController');
const ProjectsController = require('./controllers/ProjectsController');

const verifyToken = require('./middleware/verifyToken');

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.post("/user/signup", UserController.create);
router.post('/user/signin', UserController.login);
router.post('/user/signout', UserController.logout);
router.delete('/user/delete-account/:id', verifyToken, UserController.delete);

router.get('/dashboard', verifyToken, ProjectsController.index);
router.post('/dashboard/create-project', verifyToken, ProjectsController.create);
router.put('/dashboard/update-project/:id', verifyToken, ProjectsController.update);
router.delete('/dashboard/delete-project/:id', verifyToken, ProjectsController.delete);

router.get('/project/:id', ProjectsController.show);

module.exports = router;
