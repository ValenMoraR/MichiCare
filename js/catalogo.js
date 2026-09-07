/* =========================================
   GUSTO Y CATÁLOGO DE PRODUCTOS
========================================= */

const productoscatalogo = [
    { id: 1, nombre: "Arena de gatos", categoria: "higiene", precio: 45000, imagen:"../images/arena.png" },
    { id: 2, nombre: "Fuente de agua", categoria: "alimentacion", precio: 45000, imagen:"../images/fuente-agua.png"},
    { id: 3, nombre: "Dispensador de alimentacion", categoria: "alimentacion", precio: 45000, imagen:"../images/dispensador-comida.png" },
    { id: 4, nombre: "Cepillo para pelo", categoria: "higiene", precio: 45000, imagen:"../images/cepillo-pelo.png" },
    { id: 5, nombre: "Comida premium gatitos", categoria: "alimentacion", precio: 45000, imagen:"../images/comida-premium-gatitos.png" },
    { id: 6, nombre: "Comida premium castrados", categoria: "alimentacion", precio: 45000, imagen:"../images/comida-premium-castrados.png" },
    { id: 7, nombre: "Comida premium adultos", categoria: "alimentacion", precio: 45000, imagen:"../images/comida-premium.png" },
    { id: 8, nombre: "Churus", categoria: "alimentacion", precio: 45000, imagen:"../images/churus.png"},
    { id: 9, nombre: "Arenero automatico", categoria: "higiene", precio: 45000, imagen:"../images/arenero-automatico.png" },
    { id: 10, nombre: "Gimnasio para gatos", categoria: "descanso", precio: 45000, imagen:"../images/gimnasio.png" },
    { id: 11, nombre: "Raton de juguete", categoria: "juguetes", precio: 45000, imagen:"../images/ratones-tela.png" }
];

document.addEventListener("DOMContentLoaded", function () {
    const listaProductosCatalogo = document.getElementById("lista-productos");
    const botonesFiltro = document.querySelectorAll(".filter-button");
    const buscador = document.getElementById("search-input");

    // Si la página no tiene la lista de productos (ej. no es catalogo.html), detiene la ejecución
    if (!listaProductosCatalogo) return;

    let categoriaActual = "todos";
    let textoBusqueda = "";

    function mostrarProductosCatalogo(lista) {
        listaProductosCatalogo.innerHTML = "";

        if (lista.length === 0) {
            listaProductosCatalogo.innerHTML = `<p class="no-results">No se encontraron productos que coincidan con la búsqueda.</p>`;
            return;
        }

        lista.forEach(function (producto) {
            const tarjeta = document.createElement("article");
            tarjeta.className = "product-card";

            const precioFormateado = producto.precio.toLocaleString("es-CO");

            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                <div class="product-info">
                    <span class="product-category">${producto.categoria}</span>
                    <h3>${producto.nombre}</h3>
                    <strong>$${precioFormateado}</strong>
                </div>
            `;

            listaProductosCatalogo.appendChild(tarjeta);
        });
    }

    function aplicarFiltros() {
        let productosFiltrados = productoscatalogo;

        if (categoriaActual !== "todos") {
            productosFiltrados = productosFiltrados.filter(function (producto) {
                return producto.categoria === categoriaActual;
            });
        }

        if (textoBusqueda !== "") {
            productosFiltrados = productosFiltrados.filter(function (producto) {
                return producto.nombre.toLowerCase().includes(textoBusqueda) ||
                       producto.categoria.toLowerCase().includes(textoBusqueda);
            });
        }

        mostrarProductosCatalogo(productosFiltrados);
    }

    // Event listener para la barra de búsqueda
    if (buscador) {
        buscador.addEventListener("input", function () {
            textoBusqueda = buscador.value.toLowerCase().trim();
            aplicarFiltros();
        });
    }

    // Event listeners para los botones de filtro
    botonesFiltro.forEach(function (boton) {
        boton.addEventListener("click", function () {
            botonesFiltro.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            categoriaActual = boton.dataset.category || "todos";
            aplicarFiltros();
        });
    });

    // Renderizado inicial
    mostrarProductosCatalogo(productoscatalogo);
});