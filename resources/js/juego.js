export const iniPartida = (imagenes, cambiarEstado, nivel) => {
    imagenes.sort(() => Math.random() - 0.5);
    cambiarEstado(nivel, imagenes);

}