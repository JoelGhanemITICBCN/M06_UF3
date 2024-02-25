function validarCamp(camp) {
  if (camp.value.trim() !== "") {
    camp.style.border = "2px solid green";
    document.getElementById("errorNomUsuari").innerHTML = "";
  } else {
    camp.style.border = "2px solid red";
    document.getElementById("errorNomUsuari").innerHTML = "Aquest camp és obligatori.";
  }
}

function validarEmail(campEmail) {
  var email = campEmail.value.trim();
  var isValid = email.includes("@");

  if (isValid) {
    campEmail.style.border = "2px solid green";
    document.getElementById("errorEmail").innerHTML = "";
  } else {
    campEmail.style.border = "2px solid red";
    document.getElementById("errorEmail").innerHTML = "Cal un correu electrònic vàlid amb @.";
  }
}

function validarContrasenya(campContrasenya) {
  var contrasenya = campContrasenya.value;

  var mensajes = {
    length: "La contraseña debe tener al menos 8 caracteres.",
    lowercase: "La contraseña debe contener al menos una letra minúscula.",
    uppercase: "La contraseña debe contener al menos una letra mayúscula.",
    digit: "La contraseña debe contener al menos un dígito.",
    special: "La contraseña debe contener al menos un carácter especial."
  };

  var requisits = [
    { regex: /[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, label: "special" },
    { regex: /[a-z]/, label: "lowercase" },
    { regex: /[A-Z]/, label: "uppercase" },
    { regex: /[0-9]/, label: "digit" },
  ];

  var isValid = requisits.every(function (req) {
    return req.regex.test(contrasenya);
  });

  if (isValid) {
    campContrasenya.style.border = "2px solid green";
    document.getElementById("errorContrasenya").innerHTML = "";
  } else {
    campContrasenya.style.border = "2px solid red";

    for (var i = 0; i < requisits.length; i++) {
      if (!requisits[i].regex.test(contrasenya)) {
        document.getElementById("errorContrasenya").innerHTML = mensajes[requisits[i].label];
        break;
      }
    }
  }
}

function validarConfirmarContrasenya(campConfirmarContrasenya) {
  var contrasenya = document.getElementById("contrasenya").value;
  var confirmarContrasenya = campConfirmarContrasenya.value;

  if (contrasenya === confirmarContrasenya) {
    campConfirmarContrasenya.style.border = "2px solid green";
    document.getElementById("errorConfirmarContrasenya").innerHTML = "";
  } else {
    campConfirmarContrasenya.style.border = "2px solid red";
    document.getElementById("errorConfirmarContrasenya").innerHTML = "Les contrasenyes no coincideixen.";
  }
}

function validarFormulari() {
  var campNomUsuari = document.getElementById("nomUsuari");
  var campEmail = document.getElementById("email");
  var campContrasenya = document.getElementById("contrasenya");
  var campConfirmarContrasenya = document.getElementById("confirmarContrasenya");
  var campAdreca = document.getElementById("adreca");
  var campCodiPostal = document.getElementById("codiPostal");

  validarCamp(campNomUsuari);
  validarEmail(campEmail);
  validarContrasenya(campContrasenya);
  validarConfirmarContrasenya(campConfirmarContrasenya);

  if (campAdreca.value.trim() !== "") {
    campAdreca.style.border = "2px solid green";
    document.getElementById("errorAdreca").innerHTML = "";
  } else {
    campAdreca.style.border = "2px solid red";
    document.getElementById("errorAdreca").innerHTML = "Aquest camp és obligatori.";
  }


  return (
    campNomUsuari.style.border === "2px solid green" &&
    campEmail.style.border === "2px solid green" &&
    campContrasenya.style.border === "2px solid green" &&
    campConfirmarContrasenya.style.border === "2px solid green" &&
    campAdreca.style.border === "2px solid green" 
  );
}
