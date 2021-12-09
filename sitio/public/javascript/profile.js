console.log('vinculacion externa de profile.js ' );

//variable para capturar id del formulario
const $ = id => document.getElementById(id);

//capturar elementos del formulario
const name = $('name');
const password = $('password');

//expresiones regulares
const regExPassword = /^[a-zA-Z0-9!@#$%^&*]{8,20}$/;
const regExName =  /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/




name.addEventListener('keydown', function () {
    $('error-name').innerText = null;
});

name.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('error-name').innerText = 'El nombre es requerido';
            this.classList.add('is-invalid');
            break;
            case !regExName.test(this.value): 
            $('error-name').innerText = 'Solo se aceptan letras';
            this.classList.add('is-invalid');

            break;
        default:
            $('error-name').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
});

//funcion para validar el password

password.addEventListener('focus', function () {
    $('error-password').innerText = 'Ingrese una contraseña entre 8 y 20 caracteres';
});

password.addEventListener('keydown', function () {
    $('error-password').innerText = null;
});

password.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('error-password').innerText = 'La contraseña es requerida';
            this.classList.add('is-invalid');
            break;
            case !regExPassword.test(this.value): 
            $('error-password').innerText = 'La contraseña no es válida';
            this.classList.add('is-invalid');

            break;
        default:
            $('error-password').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
});