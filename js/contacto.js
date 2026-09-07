document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("contact-form");
    const resultado = document.getElementById("resultado");
    const jsonSalida = document.getElementById("json-salida");
    const saludo = document.getElementById("saludo-personalizado");

    if (!formulario) return;// Detiene la ejecución si el formulario no está en esta página

    // Obtener todos los elementos interactivos del formulario en orden
    const elementosFormulario = Array.from(
        formulario.querySelectorAll("input, textarea, button[type='submit']")
    );

    // ==========================================
    // 1. FUNCIONES DE VALIDACIÓN POR CAMPO
    // ==========================================
    function validarCampo(campo) {
        const id = campo.id;
        const valor = campo.value.trim();
        let esValido = true;

        if (id === "nombre") {
            if (valor.length < 3) {
                mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
                esValido = false;
            } else {
                limpiarError("nombre");
            }
        }

        if (id === "email") {
            const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!patronEmail.test(valor)) {
                mostrarError("email", "Escribe un correo válido (ej: nombre@correo.com).");
                esValido = false;
            } else {
                limpiarError("email");
            }
        }

        if (id === "michi") {
            if (valor.length < 1) {
                mostrarError("michi", "No olvides poner el nombre de tu gatito.");
                esValido = false;
            } else {
                limpiarError("michi");
            }
        }

        if (id === "mensaje") {
            if (valor.length < 10) {
                mostrarError("mensaje", "El mensaje debe tener al menos 10 caracteres.");
                esValido = false;
            } else {
                limpiarError("mensaje");
            }
        }

        return esValido;
    }

    // ==========================================
    // 2. VALIDACIÓN EN TIEMPO REAL (Evento input)
    // ==========================================
    elementosFormulario.forEach((elemento) => {
        if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
            elemento.addEventListener("input", function () {
                validarCampo(elemento);
            });
        }
    });

    // ==========================================
    // 3. NAVEGACIÓN CON TECLA ENTER
    // ==========================================
    formulario.addEventListener("keydown", function (evento) {
        // Verificar si la tecla presionada es Enter
        if (evento.key === "Enter") {
            const elementoActivo = document.activeElement;
            
            // Si el usuario está en el textarea sin presionar Shift, permitimos el salto de línea normal
            if (elementoActivo.tagName === "TEXTAREA" && !evento.shiftKey) {
                return;
            }

            const indiceActual = elementosFormulario.indexOf(elementoActivo);

            // Si se encuentra en un campo de texto y no es el último elemento
            if (indiceActual !== -1 && indiceActual < elementosFormulario.length - 1) {
                evento.preventDefault(); // Evita que se envíe el formulario

                // Validamos el campo actual antes de pasar al siguiente
                validarCampo(elementoActivo);

                // Pasamos el foco al siguiente campo
                elementosFormulario[indiceActual + 1].focus();
            }
        }
    });

    // ==========================================
    // 4. ENVÍO DEL FORMULARIO
    // ==========================================
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        // Validar todos los campos antes de enviar
        const campos = [
            document.getElementById("nombre"),
            document.getElementById("email"),
            document.getElementById("michi"),
            document.getElementById("mensaje")
        ];

        let formularioValido = true;

        campos.forEach((campo) => {
            const valido = validarCampo(campo);
            if (!valido) formularioValido = false;
        });

        // Si algún campo no es válido, detenemos el envío y ocultamos resultados previos
        if (!formularioValido) {
            resultado.classList.add("oculto");
            return;
        }

        // Si todo está correcto, recopilamos la información
        const datosFormulario = {
            nombre: document.getElementById("nombre").value.trim(),
            email: document.getElementById("email").value.trim(),
            michi: document.getElementById("michi").value.trim(),
            mensaje: document.getElementById("mensaje").value.trim(),
            fecha: new Date().toLocaleString("es-CO")
        };

        // Mostrar el JSON formateado y el mensaje
        jsonSalida.textContent = JSON.stringify(datosFormulario, null, 2);
        saludo.textContent = `¡Gracias, ${datosFormulario.nombre}! Te enviaremos un mensaje para hablar mas acerca de ${datosFormulario.michi} y tus inquietudes al correo ${datosFormulario.email}.`;

        resultado.classList.remove("oculto");
    });
});