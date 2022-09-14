import { SignUp } from "../models/SignUpModel.js";

const index = (request, response) => {
  response.render('signup');
}

const register = async  (request, response) => {
  try {
    const signup = new SignUp(request.body);
    await signup.register();

    if (signup.errors.length > 0) {
      request.flash("errors", signup.errors);
  
      request.session.save(() => {
        return response.redirect('back');
      });
  
      return;
    }
    
    request.flash("success", "Seu usuário foi criado com sucesso.");
    request.session.save(() => {
      return response.redirect('/login');
    });

    return;

  } catch (e) {
    console.log("ERRO -> ", e);
    return response.render('404');
  }

}

export default {
  index,
  register
};

