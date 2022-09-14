import Express from "express";
import homeController from "./src/controllers/homeController.js";
import loginController from "./src/controllers/loginController.js";
import signUpController from "./src/controllers/signUpController.js";
import contatoController from "./src/controllers/contatoController.js";

import { loginRequired } from "./src/middlewares/middleware.js";

const routes = Express.Router();

routes.get('/', homeController.index);
routes.get('/login/', loginController.index);
routes.get('/signup/', signUpController.index);
routes.post('/signup/register', signUpController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout',loginController.logout);
routes.get('/contato/', loginRequired, contatoController.index);
routes.post('/contato/register', loginRequired, contatoController.register);
routes.get('/contato/:id', loginRequired, contatoController.editIndex);
routes.post('/contato/edit/:id', loginRequired, contatoController.edit);
routes.get('/contato/delete/:id', loginRequired, contatoController.deleteContato);

export default routes;