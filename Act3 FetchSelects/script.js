function cargarSubcategorias(idCategoria) {
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
