console.log('registerValidator success');

const $ = id => document.getElementById(id);

//expresiones regulares
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/ 
const regExLetras = /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/


const formulario = $('form-register');

const elementos = formulario.elements;

const inputName = $('name');
const inputEmail = $('email');
const inputPassword = $('password');
const inputUsername = $('username');


/*name*/

inputName.addEventListener('focus', function() {
    $('info-name').innerText = "Solo letras"
    $('error-name').innerText = null;
    this.classList.remove('is-invalid');
})

inputName.addEventListener('keydown', function() {
    $('info-name').innerText = null
})

inputName.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-name').innerText = "El nombre es requerido";
            this.classList.add('is-invalid')
            break;
        case !regExLetras.test(this.value) :
            $('error-name').innerText = "Solo se permiten letras";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-name').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

/*username

inputUsername.addEventListener('focus', function() {
    $('info-name').innerText = "Solo letras"
    $('error-name').innerText = null;
    this.classList.remove('is-invalid');
})

inputName.addEventListener('keydown', function() {
    $('info-name').innerText = null
})

inputName.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-name').innerText = "El nombre es requerido";
            this.classList.add('is-invalid')
            break;
        case !regExLetras.test(this.value) :
            $('error-name').innerText = "Solo se permiten letras";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-name').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})*/

/*mail*/


inputEmail.addEventListener('focus', function() {
    $('info-email').innerText = "Escriba un email válido"
    $('error-email').innerText = null;
    this.classList.remove('is-invalid');
})

inputEmail.addEventListener('blur', async function(){
    switch (true) {
        case !this.value :
            $('error-email').innerText = "El email es requerido";
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value) : 
            $('error-email').innerText = "Email inválido";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-email').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

//password

inputPassword.addEventListener('focus', function() {
    $('info-password').innerText = "Mínimo de 8 a 20 caracteres"
    $('error-password').innerText = null;
    this.classList.remove('is-invalid');
})

inputPassword.addEventListener('keydown', function() {
    $('info-password').innerText = null;
})

inputPassword.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-password').innerText = "La contraseña es requerida";
            this.classList.add('is-invalid')
            break;
        default:
            $('error-password').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})