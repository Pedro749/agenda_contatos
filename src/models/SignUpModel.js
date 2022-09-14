import mongoose from "mongoose";
import validator from 'validator';
import bcryptjs from 'bcryptjs';

export const SignUpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});


export const SignUpModel = mongoose.model('account', SignUpSchema);

export class SignUp {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida();

    if (this.errors.length > 0) return;
    
    await this.userExists();
    
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await SignUpModel.create(this.body);
 
  }

  async userExists() {
    const user = await SignUpModel.findOne({ email: this.body.email })

    if (user) this.errors.push('Usuário já existe');
  }

  valida() {
    this.cleanUp();

    if (this.body.name.length < 3 || this.body.name.length >= 50) {
      this.errors.push('O nome precisa ter entre 3 e 50 caracteres.')
    }

    if (!validator.isEmail(this.body.email)) {
      this.errors.push('Email inválido');
    }

    if (this.body.password.length < 3 || this.body.password.length >= 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
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
      email: this.body.email,
      password: this.body.password
    };
  }

}

