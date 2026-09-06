const productoscatalogo = [
    {id: 1, nombre: "arena de gatos", categoria: "higiene", precio: 45000},
    {id: 2, nombre: "fuente de agua", categoria: "alimentacion", precio: 45000},
    {id: 3, nombre: "dispensador de alimentacion", categoria: "alimentacion", precio: 45000},
    {id: 4, nombre: "cepillo para pelo", categoria: "higiene", precio: 45000},
    {id: 5, nombre: "comida premium gatitos", categoria: "alimentacion", precio: 45000},
    {id: 6, nombre: "comida premium castrados", categoria: "alimentacion", precio: 45000},
    {id: 7, nombre: "comida premium adultos", categoria: "alimentacion", precio: 45000},
    {id: 8, nombre: "churus", categoria: "alimentacion", precio: 45000},
    {id: 9, nombre: "arenero automatico", categoria: "higiene", precio: 45000},
    {id: 10, nombre: "gimnasio para gatos", categoria: "descanso", precio: 45000},
    {id: 11, nombre: "raton de juguete", categoria: "juguetes", precio: 45000},
    
];


// ahora voy a obtener la lista de productos
const ListaProductosCatalogo = document.getElementById("lista-productos");
const botonesFiltro = document.querySelectorAll(".filter-button");
// const formulario = document.getElementById("contact-form");


function mostrarProductosCatalogo(lista){
    //limpiamos lo que tuviera antes
    ListaProductosCatalogo.innerHTML = "";

    //VOY A RECORRER CADA PRODUCTO DE LA LISTA PARA DIFERENTES COSAS
    lista.forEach(function(producto){
        //crea un nuevo nodo en el dom
        const tarjeta = document.createElement("article");
        tarjeta.className = "product-card";

        //se formatea el precio en separador de miles
        const preciosFormateados = producto.precio.toLocaleString("es-CO");

        //se llena la tarjeta que estamos creando
        tarjeta.innerHTML= `
            <div class= "product-info">
                <span class= "product-category">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <strong>${preciosFormateados}</strong>
            </div>
        `;

        //insertamos las tajetsa en el DDOM (ahora hace que aparezcan en pantalla
        ListaProductosCatalogo.appendChild(tarjeta);
    });
}

//al cargar la pagina se muestran todas lass tarjetas
mostrarProductosCatalogo(productoscatalogo);

//para hacer que funcione el buscador:
let categoriaActual = "todos";
let textoBusqueda = "";

function aplicarFiltros() {

    let productosFiltrados = productoscatalogo;

    // Filtrar por categoría
    if (categoriaActual !== "todos") {
        productosFiltrados = productosFiltrados.filter(function(producto) {
            return producto.categoria === categoriaActual;
        });
    }

    // Filtrar por texto
    if (textoBusqueda !== "") {
        productosFiltrados = productosFiltrados.filter(function(producto) {

            return producto.nombre.toLowerCase().includes(textoBusqueda) ||
                   producto.categoria.toLowerCase().includes(textoBusqueda);

        });
    }

    mostrarProductosCatalogo(productosFiltrados);
}

const buscador = document.getElementById("search-input");

buscador.addEventListener("input", function() {

    textoBusqueda = buscador.value.toLowerCase().trim();

    aplicarFiltros();
});

//Ahora camos a filtrar el catalogo con los filter de los botones que ya tenemos 
// addEventListener escucha el click de cada botón de filtro.

botonesFiltro.forEach(function(boton) {

    boton.addEventListener("click", function() {

        // Quitamos la clase active de todos los botones
        botonesFiltro.forEach(function(b) {
            b.classList.remove("active");
        });

        // Ponemos active al botón seleccionado
        boton.classList.add("active");

        // Guardamos la categoría seleccionada
        categoriaActual = boton.dataset.category;

        // Aplicamos el filtro
        aplicarFiltros();

    });

});