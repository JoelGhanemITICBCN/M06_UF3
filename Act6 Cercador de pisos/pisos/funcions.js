document.addEventListener("DOMContentLoaded", function() {
    var seleccionarDistritos = document.getElementById("districte");
    var seleccionarBarrios = document.getElementById("barri");
    seleccionarBarrios.disabled = true;

    function llenarSelectDistritos() {
        fetch("districtes.php")
        .then((response) => response.json())
        .then((data) => {
            data.forEach(valor => {
                let opcion = document.createElement("option");
                opcion.value = valor.name;
                opcion.innerHTML = valor.name;
                seleccionarDistritos.appendChild(opcion);
            });
        })
        .catch((error) => {console.log(error)});
    }

    function llenarSelectBarrios() {
        seleccionarBarrios.disabled = false;
        seleccionarBarrios.innerHTML = "";

        let formData = new FormData();
        formData.append("id", seleccionarDistritos.selectedIndex);
        let opciones = {
            method: 'POST',
            body: formData
        }

        fetch("barris.php", opciones)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(valor => {
                let opcion = document.createElement("option");
                opcion.value = valor.name;
                opcion.innerHTML = valor.name;
                seleccionarBarrios.appendChild(opcion);
            });
        })
    }

    seleccionarDistritos.addEventListener("change", llenarSelectBarrios);

    function manejarEnvioFormulario(e) {
        e.preventDefault();

        let textoPiso = document.getElementById("nomPis");
        let textoDireccion = document.getElementById("dir");
        let textoPrecio = document.getElementById("preu");
        let textoDescripcion = document.getElementById("text");

        let nombrePiso = document.getElementById("nom_pis");
        let distritos = document.getElementById("districte");
        let barrios = document.getElementById("barri");
        let via = document.getElementById("vies");
        let nombreVia = document.getElementById("nom_via");
        let numeroVia = document.getElementById("numero_via");
        let piso = document.getElementById("pis");
        let escalera = document.getElementById("escala");
        let puerta = document.getElementById("porta");
        let codigoPostal = document.getElementById("cp");
        let precio = document.getElementById("preu_pis");
        let areaTexto = document.getElementById("textarea");

        let errorMessages = document.getElementsByClassName("error-message");
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].style.display = "none";
        }

        let isValid = true;

        if (nombrePiso.value.trim() === "") {
            isValid = false;
            nombrePiso.classList.add("error");
            document.getElementById("error-nom_pis").style.display = "block";
        } else {
            nombrePiso.classList.remove("error");
        }


        if (isValid) {
            textoPiso.innerHTML = nombrePiso.value + ": " + distritos.options[distritos.selectedIndex].text + ", " + barrios.options[barrios.selectedIndex].text;
            textoDireccion.innerHTML = `${via.options[via.selectedIndex].text} ${nombreVia.value} ${numeroVia.value} ${piso.value} ${escalera.value} ${puerta.value} · ${codigoPostal.value} · ${distritos.options[distritos.selectedIndex].text} · ${barrios.options[barrios.selectedIndex].text}`;
            textoPrecio.innerHTML = precio.value;
            textoDescripcion.innerHTML = areaTexto.value;
        }
    }

    document.getElementById('form-user-register').addEventListener('submit', manejarEnvioFormulario);

    llenarSelectDistritos();
});
