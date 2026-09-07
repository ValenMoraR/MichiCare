/* =========================================
   INTERACCIÓN GLOBAL - MENÚ HAMBURGUESA
========================================= */
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", function () {
            // Alterna la clase 'show' para desplegar/ocultar el menú en móvil
            const isMenuOpen = navMenu.classList.toggle("show");

            // Atributo aria para accesibilidad
            menuButton.setAttribute("aria-expanded", isMenuOpen);

            // Cambia el ícono de hamburguesa (☰) a una 'X'
            menuButton.textContent = isMenuOpen ? "✕" : "☰";
        });

        // Cierra el menú al hacer clic en cualquier enlace
        const menuLinks = navMenu.querySelectorAll("a");
        menuLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("show");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            });
        });
    }
});