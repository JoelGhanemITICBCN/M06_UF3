// Obtener referencias a los elementos de categoría y subcategoría en el DOM
const categoriaSeleccionada = document.getElementById('categoria');
const subcategoriaSeleccionada = document.getElementById('subcategoria');

// Rutas de los archivos PHP para obtener categorías y subcategorías
const obtenerCategoriasURL = 'getCats.php';
const obtenerSubcategoriasURL = 'getSubCats.php';

// Obtener y mostrar las categorías al cargar la página
fetch(obtenerCategoriasURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en getCats. ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Crear opciones de categoría y agregarlas al elemento de categoría
        data.forEach(categoria => {
            const optionCategoria = document.createElement('option');
            optionCategoria.value = categoria.id;
            optionCategoria.text = categoria.nombre;
            categoriaSeleccionada.appendChild(optionCategoria);
        });
        // Desencadenar el evento 'change' en la categoría para cargar las subcategorías
        categoriaSeleccionada.dispatchEvent(new Event('change'));
    })
    .catch(error => {
        console.error('Error en la solicitud fetch para getCats:', error);
    });

// Manejar el cambio en la selección de categoría
categoriaSeleccionada.addEventListener("change", function() {
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
});
