import { ref } from 'vue';
import axios from 'axios';

export const useMovimiento = () => {
    const cargarMovimiento = async (movimiento) => {
        try {
            const res = await axios.post('https://localhost:7063/api/movimiento', movimiento);
            console.log('Movimiento creado correctamente', res);
            return res.data;
        } catch (error) {
            const mensaje = error.response?.data ?? 'Error desconocido al guardar el movimiento';
            console.log('Error al guardar el movimiento', error);
            throw new Error(mensaje);
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

    const obtenerMovimientosPorCliente = async (clienteId) => {
        try {
            const res = await axios.get(`https://localhost:7063/api/movimiento/cliente/${clienteId}`);
            console.log('Movimientos obtenidos correctamente', res.data);
            return res.data;
        } catch (error) {
            console.log('Error al obtener los movimientos por cliente', error);
            throw error;
        }
    }

    const editarMovimiento = async (id, movimiento) => {
        try {
            const res = await axios.put(`https://localhost:7063/api/movimiento/${id}`, movimiento);
            console.log('Movimiento editado correctamente', res);
            return res.data;
        } catch (error) {
            console.log('Error al editar el movimiento', error);
            throw error
        }
    }

    const eliminarMovimiento = async (id) => {
        try {
            const res = await axios.delete(`https://localhost:7063/api/movimiento/${id}`);
            console.log('Movimiento eliminado correctamente', res);
            return res.data;
        } catch (error) {
            console.log('Error al eliminar el movimiento', error);
            throw error
        }
    }

    return { cargarMovimiento, obtenerMovimientos, obtenerMovimientosPorCliente, editarMovimiento, eliminarMovimiento };
}
