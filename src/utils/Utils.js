export const useUtils = () => {
    const formatearFecha = (fecha) => {
        if (!fecha) return 'Sin fecha';
        return new Date(fecha).toLocaleString('es-ES');
    };

    const formatAction = (action) => {
        if (action === 'purchase') return 'Compra';
        if (action === 'sale') return 'Venta';
        return action;
    }

    return { formatearFecha, formatAction };
}
