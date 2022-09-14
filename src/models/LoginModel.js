import mongoose from "mongoose";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { SignUpSchema } from './SignUpModel.js';

export const LoginModel = mongoose.model('account', SignUpSchema);

export class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0 ) return;

    this.user = await LoginModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push('Usuário não existe');
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida");
      this.user = null;
      return;
    }
  }

  valida() {
    this.cleanUp();

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
      email: this.body.email,
      password: this.body.password
    };
  }

}

