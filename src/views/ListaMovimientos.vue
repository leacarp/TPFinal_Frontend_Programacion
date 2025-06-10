<template>
    <div class="page-container-movimiento">
        <h1 class="page-title">Lista de Movimientos</h1>
        
        <!-- Mensaje cuando no hay datos -->
        <div v-if="movimientos.length === 0" class="no-data">
            <p>No hay movimientos registrados</p>
        </div>
        
        <!-- Tabla de movimientos -->
        <div v-else class="table-container">
            <table class="movimientos-table">
                <thead>
                    <tr>
                        <th>Código de cripto</th>
                        <th>Cantidad de cripto</th>
                        <th>Fecha y hora</th>
                        <th>Cantidad en pesos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movimiento in movimientos" :key="movimiento.id">
                        <td>{{ movimiento.cryptoCode }}</td>
                        <td>{{ movimiento.cryptoAmount }}</td>
                        <td>{{ formatearFecha(movimiento.dateTime) }}</td>
                        <td>{{ movimiento.pesos }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Botón para recargar datos -->
        <button @click="cargarMovimientos" class="btn-recargar">Recargar Datos</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMovimiento } from '../composables/MovimientoComposable';
import { useUtils } from '../utils/Utils';

const { obtenerMovimientos } = useMovimiento();
const { formatearFecha } = useUtils();
const movimientos = ref([]);


// Función para cargar movimientos
const cargarMovimientos = async () => {
    try {
        console.log('Cargando movimientos...');
        const res = await obtenerMovimientos();
        console.log('Respuesta recibida:', res);
        
        // Limpiar el array primero
        movimientos.value = [];
        
        // Verificar si la respuesta es un array
        if (Array.isArray(res)) {
            movimientos.value = res;
        } else if (res && Array.isArray(res.data)) {
            // Si la respuesta viene en un objeto con propiedad 'data'
            movimientos.value = res.data;
        } else {
            console.error('La respuesta no es un array:', res);
        }
        
        console.log('Movimientos cargados:', movimientos.value);
    } catch (error) {
        console.error('Error al cargar movimientos:', error);
    }
};

onMounted(() => {
    cargarMovimientos();
});
</script>
