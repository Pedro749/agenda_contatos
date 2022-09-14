import { Login } from "../models/LoginModel.js";

const index = (request, response) => {
  if (request.session.user) return response.render('login-logado');
  return response.render('login');
}

const login = async  (request, response) => {
  try {
    const login = new Login(request.body);
    await login.login();

    if (login.errors.length > 0) {
      request.flash("errors", login.errors);
  
      request.session.save(() => {
        return response.redirect('back');
      });
  
      return;
    }
    
    request.flash("success", "Você entrou no sistema.");
    request.session.user = login.user;

    request.session.save(() => {
      return response.redirect('back');
    });

    return;

  } catch (e) {
    console.log("ERRO -> ", e);
    return response.render('404');
  }

}

const logout = (request, response) => {
  request.session.destroy();
  response.redirect('/');
}

export default {
  index,
  login,
  logout
};

