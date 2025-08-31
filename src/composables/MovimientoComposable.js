import { ref } from 'vue';
import axios from 'axios';

export const useMovimiento = () => {
    const cargarMovimiento = async (movimiento) => {
        try {
            const res = await axios.post('https://localhost:7063/api/movimiento', movimiento);
            return res.data;
        } catch (error) {
            console.log('Error al guardar el movimiento', error);
            throw error
        }
    }

    const obtenerMovimientos = async () => {
        try {
            const res = await axios.get('https://localhost:7063/api/movimiento');
            return res.data;
        } catch (error) {
            console.log('Error al obtener los movimientos', error);
            throw error
        }
    }

    const obtenerMovimientosPorCliente = async (clienteId) => {
        try {
            const res = await axios.get(`https://localhost:7063/api/movimiento/cliente/${clienteId}`);
            return res.data;
        } catch (error) {
            console.log('Error al obtener los movimientos por cliente', error);
            throw error;
        }
    }

    const editarMovimiento = async (id, movimiento) => {
        try {
            const res = await axios.put(`https://localhost:7063/api/movimiento/${id}`, movimiento);
            return res.data;
        } catch (error) {
            console.log('Error al editar el movimiento', error);
            throw error
        }
    }

    const eliminarMovimiento = async (id) => {
        try {
            const res = await axios.delete(`https://localhost:7063/api/movimiento/${id}`);
            return res.data;
        } catch (error) {
            console.log('Error al eliminar el movimiento', error);
            throw error
        }
    }

    return { cargarMovimiento, obtenerMovimientos, obtenerMovimientosPorCliente, editarMovimiento, eliminarMovimiento };
}
