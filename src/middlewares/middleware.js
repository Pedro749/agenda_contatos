export const myMiddleware = (request, response, next) => {
  response.locals.errors = request.flash('errors');
  response.locals.success = request.flash('success');
  response.locals.user = request.session.user;
  next();
}

export const checkCSRFError = (error, request, response, next) => {
  if (error) {
    return response.render('404');
  }

  next();
}

export const CSRFMiddleware = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  next();
}

export const loginRequired = (request, response, next) => {
  if (!request.session.user) {
    request.flash("errors", "Você precisa fazer login.");
    request.session.save(() => {
    return response.redirect('/');
    });
    
    return;

  } 
  next();
}