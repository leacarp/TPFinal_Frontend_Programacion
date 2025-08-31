import { ref } from 'vue';
import axios from 'axios';

export const useCliente = () => {
    const guardarCliente = async (cliente) => {
        try {
            const res = await axios.post('https://localhost:7063/api/cliente', cliente);
            return res.data;
        } catch (error) {
            console.log('Error al guardar el cliente', error);
            throw error;
        }
    }

    const obtenerClientes = async () => {
        try {
            const res = await axios.get('https://localhost:7063/api/cliente');
            return res.data;
        } catch (error) {
            console.log('Error al obtener los clientes', error);
            throw error;
        }
    }

    const editarCliente = async (id, cliente) => {
        try {
            const res = await axios.put(`https://localhost:7063/api/cliente/${id}`, cliente);
            return res.data;
        } catch (error) {
            console.log('Error al editar el cliente', error);
            throw error;
        }
    }

    const eliminarCliente = async (id) => {
        try {
            const res = await axios.delete(`https://localhost:7063/api/cliente/${id}`);
            return res.data;
        } catch (error) {
            console.log('Error al eliminar el cliente', error);
            throw error;
        }
    }

    return { guardarCliente, obtenerClientes, editarCliente, eliminarCliente };
}
