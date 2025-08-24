<template>
    <div class="page-container-movimiento">
        <h1 class="page-title">Lista de Movimientos</h1>
        
        <div v-if="movimientos.length === 0" class="no-data">
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
                    <tr v-for="movimiento in movimientos" :key="movimiento.id">
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
                        <input v-model="movimientoEdit.cryptoAmount" type="number" step="0.00000001" required>
                    </div>
                    <div class="form-group">
                        <label>Pesos:</label>
                        <input v-model="movimientoEdit.pesos" type="number" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>Fecha y Hora:</label>
                        <input v-model="movimientoEdit.dateTime" type="datetime-local" required>
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
import { useUtils } from '../utils/Utils';

const { obtenerMovimientos, editarMovimiento: editarMovimientoAPI, eliminarMovimiento } = useMovimiento();
const { formatearFecha, formatAction } = useUtils();
const movimientos = ref([]);
const showEditModal = ref(false);
const movimientoEdit = ref({});

const cargarMovimientos = async () => {
    try {
        console.log('Cargando movimientos...');
        const res = await obtenerMovimientos();
        console.log('Respuesta recibida:', res);
        
        movimientos.value = [];
        
        if (Array.isArray(res)) {
            movimientos.value = res;
        } else if (res && Array.isArray(res.data)) {
            movimientos.value = res.data;
        } else {
            console.error('La respuesta no es un array:', res);
        }
        
        console.log('Movimientos cargados:', movimientos.value);
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
        clienteId: movimiento.clienteId
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

onMounted(() => {
    cargarMovimientos();
});
</script>

<style scoped>
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
