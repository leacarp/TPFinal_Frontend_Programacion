import { ref } from 'vue';
import axios from 'axios';

export const useMovimiento = () => {
    const cargarMovimiento = async (movimiento) => {
        try {
            const res = await axios.post('https://localhost:7063/api/movimiento', movimiento);
            console.log('Movimiento creado correctamente', res);
            return res.data;
        } catch (error) {
            console.log('Error al guardar el movimiento', error);
        }
    }

    const obtenerMovimientos = async () => {
        try {
            const res = await axios.get('https://localhost:7063/api/movimiento');
            console.log('Movimientos obtenidos correctamente', res.data);
            return res.data;
        } catch (error) {
            console.log('Error al obtener los movimientos', error);
        }
    }

    return { cargarMovimiento, obtenerMovimientos };
}
