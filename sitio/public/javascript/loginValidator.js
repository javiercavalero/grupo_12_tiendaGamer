console.log('vinculación exitosa');
//variable para capturar id del formulario
const $ = id => document.getElementById(id);

//capturar elementos del formulario
const form = $('form-login');


//capturar inputs del formulario
const inputEmail = $('email');
const inputPassword = $('password');
const btnWatch = $('watch');

//expresiones regulares
const regExEmail= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const regExPassword = /^[\s\S]{8,20}$/

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
    $('error-password').innerText = 'Ingrese su contraseña';
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
        default:
            $('error-password').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
});

form.addEventListener('submit', e => {
    
    e.preventDefault();
    
    let error = false;
    const elementos = form.elements;
    
    for (let i = 0; i < elementos.length - 1; i++) {
        
        if(!elementos[i].value){
            elementos[i].classList.add('is-invalid');
            $('error-empty').innerText = "Los campos señalados son obligatorios";
            error = true;
        }
        if(!error){
        form.submit()
    }
    }
    

})

//ver la contraseña
btnWatch.addEventListener('click', () => {
    inputPassword.type === "text" ? inputPassword.type = "password" : inputPassword.type = "text";
})