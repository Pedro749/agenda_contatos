export default class FormValidator {
  constructor(inputClass) {
    this.form = document.querySelector(inputClass);
    this.inputs = [...this.form];
  }

  init() {
    this.validate();
    this.sendForm();
  }

  addAuxText(element, text, focus) {
    if (focus) element.focus();

    element.nextElementSibling.innerHTML = text;

  }

  validate() {
    this.isValid = true;
    const regex = {
      email: /\S+@\S+\.\S+/
    }

    const oneOrAnother = [];

    for(let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].classList.contains("required")) {
        if (this.inputs[i].value === "") {
          this.addAuxText(this.inputs[i], "Preencha este campo!", true);
          this.isValid = false;
          return;
        } else {
          this.addAuxText(this.inputs[i], "");
        }
      }

      if (this.inputs[i].classList.contains("email-valid")) {
        if (this.inputs[i].value !== "") {
          if (!regex.email.test(this.inputs[i].value)) {
            this.addAuxText(this.inputs[i], "Preencha um email válido", true);
            this.isValid = false;
            return;
          } else {
            this.addAuxText(this.inputs[i], "");
          }
        }
      }

      if (this.inputs[i].classList.contains("min-3")) {
        if (this.inputs[i].value.length < 3) {
          this.addAuxText(this.inputs[i], "O campo precisa de no minímo 3 caracteres!", true);
          this.isValid = false;
          return;
        } else {
          this.addAuxText(this.inputs[i], "");
        }
      }

      if (this.inputs[i].classList.contains("max-50")) {
        if (this.inputs[i].value.length > 50) {
          this.addAuxText(this.inputs[i], "O campo pode conter no máximo 50 caracteres!", true);
          this.isValid = false;
          return;
        } else {
          this.addAuxText(this.inputs[i], "");
        }
      }

      if (this.inputs[i].classList.contains("required-or")) {
        oneOrAnother.push(this.inputs[i]);
      }
    }

    if (oneOrAnother.length > 1) {
      oneOrAnother.forEach(element => this.addAuxText(element, ""));
      oneOrAnother.reduce((one, another) => {
        if (one.value == "" && another.value == "") {
          this.addAuxText(one, "Pelo menos uma forma de contato deve ser enviada: Email ou Telefone!", true);
          this.addAuxText(another, "Pelo menos uma forma de contato deve ser enviada: Email ou Telefone!", true);
          this.isValid = false;
          return;
        }
       })
    }
  }

  async sendForm() {
   if (this.isValid) {
      this.form.submit();
   } else {
     return;
   }

  }

}