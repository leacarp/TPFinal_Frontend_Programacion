<template>
    <div class="page-container-movimiento">
        <h1 class="page-title">Lista de Movimientos</h1>
        
        <!-- Filtro por cliente -->
        <div class="filter-section">
            <label class="filter-label">Filtrar por cliente:</label>
            <select v-model="clienteSeleccionado" @change="filtrarMovimientos" class="filter-select">
                <option value="">Todos los clientes</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.nombre">
                    {{ cliente.nombre }}
                </option>
            </select>
            <button v-if="clienteSeleccionado" @click="limpiarFiltro" class="btn-limpiar">Limpiar filtro</button>
        </div>
        
        <div v-if="movimientosFiltrados.length === 0" class="no-data">
            <p>No hay movimientos registrados</p>
        </div>
        
        <div v-else class="table-container">
            <table class="movimientos-table">
                <thead>
                    <tr>
                        <th>Código de cripto</th>
                        <th>Cantidad de cripto</th>
                        <th>Fecha y hora</th>
                        <th>Cantidad en pesos</th>
                        <th>Cliente</th>
                        <th>Acción realizada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movimiento in movimientosFiltrados" :key="movimiento.id">
                        <td>{{ movimiento.cryptoCode.toUpperCase() }}</td>
                        <td>{{ movimiento.cryptoAmount }}</td>
                        <td>{{ formatearFecha(movimiento.dateTime) }}</td>
                        <td>{{ movimiento.pesos }}</td>
                        <td>{{ movimiento.cliente }}</td>
                        <td>{{ formatAction(movimiento.action) }}</td>
                        <td class="actions-cell">
                            <button @click="editarMovimiento(movimiento)" class="btn-editar">Editar</button>
                            <button @click="confirmarEliminar(movimiento)" class="btn-eliminar">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <button @click="cargarMovimientos" class="btn-recargar">Recargar Datos</button>

        <!-- Modal para editar movimiento -->
        <div v-if="showEditModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <h2>Editar Movimiento</h2>
                <form @submit.prevent="guardarEdicion" class="edit-form">
                    <div class="form-group">
                        <label>Código de Cripto:</label>
                        <input v-model="movimientoEdit.cryptoCode" type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Acción:</label>
                        <select v-model="movimientoEdit.action" required>
                            <option value="purchase">Compra</option>
                            <option value="sale">Venta</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cantidad de Cripto:</label>
                        <input v-model="movimientoEdit.cryptoAmount" type="number" step="any" required>
                    </div>
                    <div class="form-group">
                        <label>Cliente:</label>
                        <select v-model="movimientoEdit.clienteId" required>
                            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                            {{ cliente.nombre }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="modal-buttons">
                        <button type="submit" class="btn-guardar">Guardar</button>
                        <button type="button" @click="closeModal" class="btn-cancelar">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMovimiento } from '../composables/MovimientoComposable';
import { useCliente } from '../composables/ClienteComposable';
import { useUtils } from '../utils/Utils';

const { obtenerMovimientos, editarMovimiento: editarMovimientoAPI, eliminarMovimiento } = useMovimiento();
const { obtenerClientes } = useCliente();
const { formatearFecha, formatAction } = useUtils();
const movimientos = ref([]);
const clientes = ref([]);
const showEditModal = ref(false);
const movimientoEdit = ref({});
const clienteSeleccionado = ref('');
const movimientosFiltrados = ref([]);

const cargarMovimientos = async () => {
    try {
        const res = await obtenerMovimientos();
        
        movimientos.value = [];
        
        if (Array.isArray(res)) {
            movimientos.value = res;
        } else if (res && Array.isArray(res.data)) {
            movimientos.value = res.data;
        } else {
            console.error('La respuesta no es un array:', res);
        }
        
        movimientosFiltrados.value = movimientos.value;
    } catch (error) {
        console.error('Error al cargar movimientos:', error);
    }
};

const editarMovimiento = (movimiento) => {
    movimientoEdit.value = {
        id: movimiento.id,
        cryptoCode: movimiento.cryptoCode,
        action: movimiento.action,
        cryptoAmount: movimiento.cryptoAmount,
        pesos: movimiento.pesos,
        dateTime: new Date(movimiento.dateTime).toISOString().slice(0, 16),
        clienteId: clientes.value.find(c => c.nombre === movimiento.cliente)?.id
    };
    showEditModal.value = true;
};

const guardarEdicion = async () => {
    try {
        await editarMovimientoAPI(movimientoEdit.value.id, movimientoEdit.value);
        alert('Movimiento editado correctamente');
        closeModal();
        cargarMovimientos();
    } catch (error) {
        console.error('Error al editar movimiento:', error);
        alert('Error al editar el movimiento');
    }
};

const confirmarEliminar = (movimiento) => {
    if (confirm(`¿Estás seguro de que quieres eliminar este movimiento de ${movimiento.cryptoCode}?`)) {
        eliminarMovimientoHandler(movimiento.id);
    }
};

const eliminarMovimientoHandler = async (id) => {
    try {
        await eliminarMovimiento(id);
        alert('Movimiento eliminado correctamente');
        cargarMovimientos();
    } catch (error) {
        console.error('Error al eliminar movimiento:', error);
        alert('Error al eliminar el movimiento');
    }
};

const closeModal = () => {
    showEditModal.value = false;
    movimientoEdit.value = {};
};

const handleClientes = async () => {
    const res = await obtenerClientes();
    clientes.value = res;
};

const filtrarMovimientos = () => {
    if (clienteSeleccionado.value === '') {
        movimientosFiltrados.value = movimientos.value;
    } else {
        movimientosFiltrados.value = movimientos.value.filter(mov => mov.cliente === clienteSeleccionado.value);
    }
};

const limpiarFiltro = () => {
    clienteSeleccionado.value = '';
    movimientosFiltrados.value = movimientos.value;
};

onMounted(() => {
    cargarMovimientos();
    handleClientes();
});
</script>

<style scoped>
.filter-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-label {
    font-weight: bold;
    color: #495057;
}

.filter-select {
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    min-width: 200px;
}

.filter-select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.btn-limpiar {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-limpiar:hover {
    background-color: #5a6268;
}

.actions-cell {
    display: flex;
    gap: 8px;
    justify-content: center;
}

.btn-editar {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.btn-eliminar {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.btn-editar:hover {
    background-color: #0056b3;
}

.btn-eliminar:hover {
    background-color: #c82333;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 400px;
    max-width: 500px;
}

.edit-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-group label {
    font-weight: bold;
}

.form-group input,
.form-group select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.modal-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
}

.btn-guardar {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-cancelar {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-guardar:hover {
    background-color: #218838;
}

.btn-cancelar:hover {
    background-color: #5a6268;
}
</style>
