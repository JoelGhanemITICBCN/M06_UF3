let nombre = document.getElementById('validationNom');
let apellidos = document.getElementById('validationCognoms');
let dni = document.getElementById('validationDNI');
let correo = document.getElementById('validationEmail');
let telefono = document.getElementById('validationTelf');

$(nombre).on('focusout', () => {validarVacio(nombre)})
$(apellidos).on('focusout', () => {validarVacio(apellidos)})
$(dni).on('focusout', () => {validarNIF_NIE(dni)})
$(correo).on('focusout', () => {validarCorreo(correo)})
$(telefono).on('focusout', () => {validarTelefono(telefono)})

$('#form-user-register').submit(function(e) {
  e.preventDefault();

  if (
    validarVacio(nombre) &&
    validarVacio(apellidos) &&
    validarNIF_NIE(dni) &&
    validarCorreo(correo) &&
    validarTelefono(telefono)
  ) {
    this.submit();
  } else {
    return false;
  }
});

function validarVacio(dato) {
  if (dato.value == '') {
    dato.classList.remove('is-valid');
    dato.classList.add('is-invalid');
    textoError(dato.id.substring(10), 'Este campo no puede estar vacío.');
    return false;
  } else {
    document.getElementById(`feedback${(dato.id.substring(10))}`).innerHTML = "";
    dato.classList.remove('is-invalid');
    dato.classList.add('is-valid');
    return true;
  }
}
function validarNIF_NIE(dni){
  if (validarVacio(dni)) {
    valor = dni.value;
    var caracteresValidos = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifExpresion = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieExpresion = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = valor.toString().toUpperCase();

    if (!nifExpresion.test(str) && !nieExpresion.test(str)) {
      dni.classList.remove('is-valid');
      dni.classList.add('is-invalid');
      textoError(dni.id.substring(10), 'El DNI es inválido.');
      return false;
    }

    var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    var letra = str.substr(-1);
    var indiceCaracter = parseInt(nie.substr(0, 8)) % 23;

    if (caracteresValidos.charAt(indiceCaracter) === letra) {
      dni.classList.remove('is-invalid');
      dni.classList.add('is-valid');
      return true;
    }
    dni.classList.remove('is-valid');
    dni.classList.add('is-invalid');
    textoError(dni.id.substring(10), 'El DNI es inválido.');
    return false;
  }
  return false;
}

function validarCorreo(email) {
    if (validarVacio(email)) {
      const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (regexCorreo.test(email.value)) {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
        return true;
      } else {
        email.classList.remove('is-valid');
        email.classList.add('is-invalid');
        textoError(email.id.substring(10), 'El correo electrónico es inválido, debe ser una dirección de correo válida.');
      }
    }
    return false;
}

function comprobarUsuarioRegistrado(nom, cognoms, dni, username, email, tlf) {
  $('#form-user-register').on('submit', function(e) {
    e.preventDefault();
  });
  $(document).ready(function() {
    $.ajax({
      method: 'POST',
      url: 'insertarUsuaris.php',
      data: { 
        nom: nom.value, 
        cognoms: cognoms.value, 
        DNI: dni.value, 
        username: username.value, 
        email: email.value, 
        tlf: tlf.value 
      },
      success: function(response) {
        console.log(response);
        if (response === 'email_registrado') {
          alert('El correo electrónico ya está registrado.');
        } else if (response === 'dni_registrado') {
          alert('El DNI ya está registrado.');
        } else if (response === 'insertado') {
          alert('El usuario ha sido insertado correctamente.');
          $('#form-user-register')[0].reset();
        } else {
          alert('Hubo un error al insertar el usuario.');
        }
      },
      error: function() {
        alert('Hubo un error al insertar el usuario.');
      }
    });
  });
}
function validarTelefono(tlf) {
  if (validarVacio(tlf)) { 
    var expresionTelefono = /^\d{9}$/;
    if (tlf.value.match(expresionTelefono)) {
      tlf.classList.remove('is-invalid');
      tlf.classList.add('is-valid');
      return true;
    }
    tlf.classList.remove('is-valid');
    tlf.classList.add('is-invalid');
    textoError(tlf.id.substring(10), 'El teléfono es inválido, debe tener 9 dígitos.');
  }
  return false;
}


function textoError(elemento, texto) {
    let elementoFeedback = document.getElementById(`feedback${elemento}`);
    if (elementoFeedback) {
      elementoFeedback.innerHTML = `<p class="invalid-feedback">${texto}</p>`;
      let elementoTexto = document.querySelectorAll('.invalid-feedback');
      elementoTexto.forEach((elemento) => { elemento.style.display = 'block'; });
    }
  }
  
  document.querySelector('.input-group-text').addEventListener('click', function() {
    let nombreUsuario = "";
  
    nombreUsuario += nombre.value.charAt(0).toLowerCase();
    nombreUsuario += apellidos.value.charAt(0).toUpperCase();
    nombreUsuario += (apellidos.value.replace(/ /g,'')).substring(1, 4).toLowerCase();
    for (let i = 0; i < 7; i++) {
      if (i % 2 == 0) nombreUsuario += dni.value.charAt(i);
    }
  
    document.getElementById('validationUsername').value = nombreUsuario;
  });;



