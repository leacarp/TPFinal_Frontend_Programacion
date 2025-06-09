import { ref } from 'vue';
import axios from 'axios';

export const useCliente = () => {
    const guardarCliente = async (cliente) => {
        try {
            const res = await axios.post('https://localhost:7063/api/cliente', cliente);
            console.log('Cliente creado correctamente', res);
            return res.data;
        } catch (error) {
            console.log('Error al guardar el cliente', error);
        }
    }

    const obtenerClientes = async () => {
        try {
            const res = await axios.get('https://localhost:7063/api/cliente');
            console.log('Clientes obtenidos correctamente', res.data);
            return res.data;
        } catch (error) {
            console.log('Error al obtener los clientes', error);
        }
    }

    return { guardarCliente, obtenerClientes };
}
