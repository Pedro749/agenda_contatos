import FormValidator from "./FormValidator.js";

const form = document.querySelector('.form-valid');
if (form) {
  const formValidator = new FormValidator('.form-valid');
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    formValidator.init();
    formValidator.sendForm();
  })
}
