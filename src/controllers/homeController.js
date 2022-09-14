import { Contato } from '../models/ContatoModel.js';

const index = async (request, response) => {
  const contatos = await Contato.buscaContatos();
  response.render('index', { contatos });
}

export default {
  index
};
