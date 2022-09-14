import mongoose from "mongoose";
import validator from "validator";

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  created_at: { type: Date, default: Date.now }
});

export const ContatoModel = mongoose.model('contato', ContatoSchema);

export class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contao = null;
  }

  async register() {
    this.valida();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
  }

  valida() {
    this.cleanUp();

    if (!this.body.name) {
      this.errors.push('Nome é um campo obrigatório.');
    }

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push('Email inválido');
    }
    
    if (!this.body.phone && !this.body.email) {
      this.errors.push('Pelo menos uma forma de contato deve ser enviada: Email ou Telefone! ');
    }
  }

  cleanUp() {
    for(const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      phone: this.body.phone,
      email: this.body.email
    };
  }

  static async buscaPorId (id) {
    if (typeof id !== 'string') return;

    const contato = await ContatoModel.findById(id);
    return contato;
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.valida();

    if (this.errors.length > 0 ) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  static async buscaContatos() {
    const contatos = await ContatoModel.find().sort({ created_at: -1 });
    return contatos;
  }

  static async deleteContato(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
  }
}

