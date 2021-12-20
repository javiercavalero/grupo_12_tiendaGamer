console.log('registerValidator success');

const $ = id => document.getElementById(id);

//expresiones regulares
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/ 
const regExLetras = /^[a-z ,.'-]+$/i
const regExPassword = /^[\s\S]{8,20}$/



const formulario = $('form-register')
const inputName = $('name');
const inputEmail = $('email');
const inputPassword = $('password');
const inputUsername = $('username');
const buttonSend= $('enviar');


/*name*/

inputName.addEventListener('focus', function() {
    $('info-name').innerText = "Solo letras"
    $('error-name').innerText = null;
    this.classList.remove('is-valid');
})

inputName.addEventListener('keydown', function() {
    $('info-name').innerText = null
})

inputName.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-name').innerText = "El nombre es requerido";
            this.classList.add('is-invalid');
            $('info-name').innerText = null;
            break;
        case !regExLetras.test(this.value) :
            $('error-name').innerText = "Solo se permiten letras sin espacios al final";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-name').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

/* username */

inputUsername.addEventListener('focus', function() {
    $('info-username').innerText = "Solo letras"
    $('error-username').innerText = null;
    this.classList.remove('is-valid');
})

inputUsername.addEventListener('keydown', function() {
    $('info-username').innerText = null
})

inputUsername.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-username').innerText = "El nombre de usuario es requerido";
            this.classList.add('is-invalid');
            $('info-username').innerText = null;
            break;
        case !regExLetras.test(this.value) :
            $('error-username').innerText = "Solo se permiten letras sin espacios al final";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-username').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})
/*mail*/


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

//password

inputPassword.addEventListener('focus', function () {
    $('error-password').innerText = 'Ingrese una contraseña entre 8 y 20 caracteres';
});

inputPassword.addEventListener('keydown', function () {
    $('error-password').innerText = null;
});

inputPassword.addEventListener('blur', function () {
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

formulario.addEventListener('submit', e => {
    
    e.preventDefault();
    
    let error = false;
    const elementos = formulario.elements;
    
    for (let i = 0; i < elementos.length - 1; i++) {
        
        if(!elementos[i].value){
            elementos[i].classList.add('is-invalid');
            $('error-empty').innerText = "Los campos señalados son obligatorios";
            error = true;
        }
        if(!error){
        formulario.submit()
    }
    }
    

})

