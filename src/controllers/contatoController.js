import { Contato } from "../models/ContatoModel.js";

const index = (request, response) => {
  response.render('contato', {
    contato: {}
  });
  
}

const register = async (request, response) => {
  try {
    const contato = new Contato(request.body);
    await contato.register();
    
    if (contato.errors.length > 0) {
      request.flash("errors", contato.errors);
  
      request.session.save(() => {
        return response.redirect('back');
      });
  
      return;
    }
    
    request.flash("success", "Seu contato foi criado com sucesso.");
    request.session.save(() => {
      return response.redirect(`/contato/${ contato.contato._id }`);
    });

    return;

  } catch (e) {
    console.log("ERRO -> ", e);
    return response.render('404');
  }

}

const editIndex = async (request, response) => {
  if (!request.params.id) return response.render('404');

  const contato = await Contato.buscaPorId(request.params.id);

  if (!contato) return response.render('404');

  response.render('contato', { contato });

}

const edit = async (request, response) => {
  try {
    if (!request.params.id) return response.render('404');

    const contato = new Contato(request.body);
    await contato.edit(request.params.id);

    if (contato.errors.length > 0) {
      request.flash("errors", contato.errors);
  
      request.session.save(() => {
        return response.redirect('back');
      });
  
      return;
    }
    
    request.flash("success", "Seu contato foi alterado com sucesso.");

    request.session.save(() => {
      return response.redirect(`/contato/${ contato.contato._id }`);
    });

    return;

  } catch (e) {
    console.log("ERRO -> ", e);
    return response.render('404');
  }
}

const deleteContato = async (request, response) => {
  try {
    if (!request.params.id) return response.render('404');

    const contato = await Contato.deleteContato(request.params.id);
    
    if (!contato) return response.render('404');

    request.flash("success", "Seu contato foi deletado com sucesso.");

    request.session.save(() => {
      return response.redirect(`back`);
    });

    return;

  } catch (e) {
    console.log("ERRO -> ", e);
    return response.render('404');
  }
}

export default {
  index,
  register,
  editIndex,
  edit,
  deleteContato
};

