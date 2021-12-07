console.log('vinculación exitosa');
//variable para capturar id del formulario
const $ = id => document.getElementById(id);

//capturar elementos del formulario
const form = $('form-login');

const elements = form.elements;


//capturar inputs del formulario
const inputEmail = $('email');
const inputPassword = $('password');

//expresiones regulares
const regExEmail= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const regExPassword = /^[a-zA-Z0-9!@#$%^&*]{8,20}$/;

//funcion para validar el email

inputEmail.addEventListener('focus', function () {
    $('error-email').innerText = 'Ingrese su correo electrónico';
});

inputEmail.addEventListener('keydown', function () {
    $('error-email').innerText = null;
});

inputEmail.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('error-email').innerText = 'El correo es requerido';
            this.classList.add('is-invalid');
            break;
            case !regExEmail.test(this.value): 
            $('error-email').innerText = 'El correo no es válido, agregue @ ';
            this.classList.add('is-invalid');

            break;
        default:
            $('error-email').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
});

//funcion para validar el password

inputPassword.addEventListener('focus', function () {
    $('error-password').innerText = 'Ingrese una contraseña entre 8 y 20 caracteres';
});

inputPassword.addEventListener('keydown', function () {
    $('error-password').innerText = null;
});

inputPassword.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('error-password').innerText = 'El password es requerido';
            this.classList.add('is-invalid');
            break;
            case !regExPassword.test(this.value): 
            $('error-password').innerText = 'El password no es válido';
            this.classList.add('is-invalid');

            break;
        default:
            $('error-email').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
});