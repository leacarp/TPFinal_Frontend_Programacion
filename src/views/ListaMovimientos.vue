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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movimiento in movimientos" :key="movimiento.id">
                        <td>{{ movimiento.cryptoCode }}</td>
                        <td>{{ movimiento.cryptoAmount }}</td>
                        <td>{{ formatearFecha(movimiento.dateTime) }}</td>
                        <td>{{ movimiento.pesos }}</td>
                        <td>{{ movimiento.cliente }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
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

onMounted(() => {
    cargarMovimientos();
});
</script>
