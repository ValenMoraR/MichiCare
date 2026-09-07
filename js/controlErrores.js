function mostrarError(idCampo, texto) {
    const campo = document.getElementById(idCampo);
    const spanError = document.getElementById(idCampo + "-error");

    if (campo) campo.classList.add("invalido");
    if (spanError) spanError.textContent = texto;
}

function limpiarError(idCampo) {
    const campo = document.getElementById(idCampo);
    const spanError = document.getElementById(idCampo + "-error");

    if (campo) campo.classList.remove("invalido");
    if (spanError) spanError.textContent = "";
}