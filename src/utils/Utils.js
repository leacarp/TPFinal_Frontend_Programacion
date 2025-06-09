export const useUtils = () => {
    const formatearFecha = (fecha) => {
        if (!fecha) return 'Sin fecha';
        return new Date(fecha).toLocaleString('es-ES');
    };

    return { formatearFecha };
}
