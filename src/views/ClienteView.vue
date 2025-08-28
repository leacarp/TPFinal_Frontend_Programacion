<template>
    <div class="page-container">
        <h1 class="page-title">Gestión de Clientes</h1>
        
        <!-- Formulario para crear/editar cliente -->
        <div class="form-section">
            <h2>{{ isEditing ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>
            <form @submit.prevent="guardarCliente" class="form-container">
                <div class="input-group">
                    <label class="form-label">Nombre completo</label>
                    <input type="text" class="form-control" v-model="cliente.nombre" required placeholder="Nombre">
                </div>
                <div class="input-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="cliente.email" required placeholder="Email">
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-guardar">
                        {{ isEditing ? 'Actualizar' : 'Guardar' }} Cliente
                    </button>
                    <button v-if="isEditing" type="button" @click="cancelarEdicion" class="btn-cancelar">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>

        <!-- Tabla de clientes -->
        <div class="table-section">
            <h2>Lista de Clientes</h2>
            
            <div v-if="clientes.length === 0" class="no-data">
                <p>No hay clientes registrados</p>
            </div>
            
            <div v-else class="table-container">
                <table class="clientes-table">
                    <thead>
                        <tr>
                            <!-- <th>ID</th> -->
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Movimientos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in clientes" :key="cliente.id">
                            <!-- <td>{{ cliente.id }}</td> -->
                            <td>{{ cliente.nombre }}</td>
                            <td>{{ cliente.email }}</td>
                            <td>{{ cliente.movimientos ? cliente.movimientos.length : 0 }}</td>
                            <td class="actions-cell">
                                <button @click="editarCliente(cliente)" class="btn-editar">Editar</button>
                                <button @click="confirmarEliminar(cliente)" class="btn-eliminar">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <button @click="cargarClientes" class="btn-recargar">Recargar Datos</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCliente } from '../composables/ClienteComposable';

const { guardarCliente: guardarClienteAPI, obtenerClientes, editarCliente: editarClienteAPI, eliminarCliente: eliminarClienteAPI } = useCliente();

const clientes = ref([]);
const isEditing = ref(false);
const cliente = ref({
    id: null,
    nombre: '',
    email: ''
});

const cargarClientes = async () => {
    try {
        const res = await obtenerClientes();
        clientes.value = Array.isArray(res) ? res : [];
        console.log('Clientes cargados:', clientes.value);
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        alert('Error al cargar los clientes');
    }
};

const guardarCliente = async () => {
    try {
        if (isEditing.value) {
            await editarClienteAPI(cliente.value.id, cliente.value);
            alert('Cliente actualizado correctamente');
        } else {
            await guardarClienteAPI({ nombre: cliente.value.nombre, email: cliente.value.email });
            alert('Cliente creado correctamente');
        }
        
        limpiarFormulario();
        cargarClientes();
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        alert('Error al guardar el cliente');
    }
};

const editarCliente = (clienteData) => {
    cliente.value = {
        id: clienteData.id,
        nombre: clienteData.nombre,
        email: clienteData.email
    };
    isEditing.value = true;
};

const cancelarEdicion = () => {
    limpiarFormulario();
};

const confirmarEliminar = (clienteData) => {
    if (confirm(`¿Estás seguro de que quieres eliminar al cliente "${clienteData.nombre}"?`)) {
        eliminarClienteHandler(clienteData.id);
    }
};

const eliminarClienteHandler = async (id) => {
    try {
        await eliminarClienteAPI(id);
        alert('Cliente eliminado correctamente');
        cargarClientes();
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        alert('Error al eliminar el cliente');
    }
};

const limpiarFormulario = () => {
    cliente.value = {
        id: null,
        nombre: '',
        email: ''
    };
    isEditing.value = false;
};

onMounted(() => {
    cargarClientes();
});
</script>

<style scoped>
.page-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.page-title {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.form-section {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
}

.form-section h2 {
    margin-bottom: 20px;
    color: #495057;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-label {
    font-weight: bold;
    color: #495057;
}

.form-control {
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
}

.form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.btn-guardar {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.btn-cancelar {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.btn-guardar:hover {
    background-color: #218838;
}

.btn-cancelar:hover {
    background-color: #5a6268;
}

.table-section {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-section h2 {
    margin-bottom: 20px;
    color: #495057;
}

.table-container {
    overflow-x: auto;
}

.clientes-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.clientes-table th,
.clientes-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
}

.clientes-table th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #495057;
}

.clientes-table tr:hover {
    background-color: #f8f9fa;
}

.actions-cell {
    display: flex;
    gap: 8px;
    justify-content: flex-start;
}

.btn-editar {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-eliminar {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-editar:hover {
    background-color: #0056b3;
}

.btn-eliminar:hover {
    background-color: #c82333;
}

.btn-recargar {
    background-color: #17a2b8;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.btn-recargar:hover {
    background-color: #138496;
}

.no-data {
    text-align: center;
    padding: 40px;
    color: #6c757d;
    font-style: italic;
}
</style>
