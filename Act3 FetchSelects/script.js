const obtenerCategoriasURL = 'getCats.php';
const obtenerSubcategoriasURL = 'getSubCats.php';
const servicioPhp = "servicio.php";

// Función para cargar categorías
function cargarCategorias() {
    // Obtener referencias a los elementos de categoría y subcategoría en el DOM
    const categoriaSeleccionada = document.getElementById('categoria');
    const subcategoriaSeleccionada = document.getElementById('subcategoria');

    // Obtener y mostrar las categorías al cargar la página
    fetch(obtenerCategoriasURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en getCats. ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 

            // Verificar si data es un array o un objeto directo
            const categorias = Array.isArray(data) ? data : [data];

            // Crear opciones de categoría y agregarlas al elemento de categoría
            categorias.forEach(categoria => {
                const optionCategoria = document.createElement('option');
                optionCategoria.value = categoria.id;
                optionCategoria.text = categoria.nombre;
                categoriaSeleccionada.appendChild(optionCategoria);
            });
            // Desencadenar el evento 'change' en la categoría para cargar las subcategorías
            categoriaSeleccionada.addEventListener("change", cargarSubcategorias);
            categoriaSeleccionada.dispatchEvent(new Event('change'));
        })
        .catch(error => {
            console.error('Error en la solicitud fetch para getCats:', error);
        });
}

// Función para cargar subcategorías
function cargarSubcategorias() {
    // Obtener referencias a los elementos de categoría y subcategoría en el DOM
    const categoriaSeleccionada = document.getElementById('categoria');
    const subcategoriaSeleccionada = document.getElementById('subcategoria');

    // Crear datos del formulario para enviar la categoría seleccionada
    let formData = new FormData();
    formData.append('cat', categoriaSeleccionada.value);

    // Configurar las opciones para la solicitud fetch de subcategorías
    let opciones = {
        method: 'POST',
        body: formData
    };

    // Obtener y mostrar las subcategorías correspondientes a la categoría seleccionada
fetch(obtenerSubcategoriasURL, opciones)
.then(response => {
    if (!response.ok) {
        throw new Error(`Error en getSubCats. ${response.status}`);
    }
    return response.json();
})
.then((data) => {
    console.log(data); 
    // Limpiar las opciones anteriores de subcategoría
    subcategoriaSeleccionada.innerHTML = "";

    // Crear opciones de subcategoría y agregarlas al elemento de subcategoría
    data.forEach(subcategoria => {
        let optionSubcategoria = document.createElement("option");
        optionSubcategoria.value = subcategoria.id;
        optionSubcategoria.text = subcategoria.nombre;
        subcategoriaSeleccionada.appendChild(optionSubcategoria);
    });
})
.catch(error => {
    console.error('Error en la solicitud fetch para getSubCats:', error);
});

}

cargarCategorias();
