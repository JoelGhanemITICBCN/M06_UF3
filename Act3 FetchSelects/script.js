// Función para cargar categorías
function cargarCategorias() {
    // Configurar opciones para la petición fetch
    let options = {
        method: 'GET'
    };

    // Realizar la llamada al servicio PHP para obtener las categorías
    fetch("getCats.php", options)
        .then((response) => response.json())
        .then((data) => {
            // Limpiar el selector de categorías
            var categoriaSelector = document.getElementById("categoria");
            categoriaSelector.innerHTML = "<option value=''>Selecciona una categoría</option>";

            // Llenar el selector de categorías con las obtenidas del servicio
            data.forEach(categoria => {
                var opt = document.createElement('option');
                opt.value = categoria.id;
                opt.innerHTML = categoria.nom;
                categoriaSelector.appendChild(opt);
            });
        })
        .catch((error) => {
            console.log("F", error);
            //console.log('Error:', error);
        });
}

// Función para cargar subcategorías
function cargarSubcategorias() {
    // Recoger el valor seleccionado del primer selector (categoría)
    let idCategoria = document.getElementById("categoria").value;
    
    // Crear un objeto FormData con el id de la categoría seleccionada
    let formData = new FormData();
    formData.append("idCategoria", idCategoria);

    // Configurar opciones para la petición fetch
    let options = {
        method: 'POST',
        body: formData
    };

    // Realizar la llamada al servicio PHP para obtener las subcategorías
    fetch("getSubCats.php", options)
        .then((response) => response.json())
        .then((data) => {
            // Limpiar el selector de subcategorías
            var subcategoriaSelector = document.getElementById("subcategoria");
            subcategoriaSelector.innerHTML = "<option value=''>Selecciona una subcategoría</option>";

            // Llenar el selector de subcategorías con las obtenidas del servicio
            data.forEach(subcategoria => {
                var opt = document.createElement('option');
                opt.value = subcategoria.id;
                opt.text = subcategoria.nom;
                subcategoriaSelector.appendChild(opt);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Asociar la función cargarCategorias al cargar la página
document.addEventListener("DOMContentLoaded", cargarCategorias);

// Asociar la función cargarSubcategorias al evento de cambio del primer selector (categoría)
document.getElementById("categoria").addEventListener("change", cargarSubcategorias);
