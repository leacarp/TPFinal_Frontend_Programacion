<template>
    <div class="page-container">
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

<style scoped>
/* Contenedor principal */
.page-container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Título */
.page-title {
    text-align: center;
    color: #1a1a2e;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
}

/* Contenedor de la tabla */
.table-container {
    overflow-x: auto;
    margin-bottom: 2rem;
}

/* Tabla */
.movimientos-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Encabezados */
.movimientos-table th {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: white;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Celdas */
.movimientos-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e9ecef;
    color: #1a1a2e;
}

/* Filas alternadas */
.movimientos-table tbody tr:nth-child(even) {
    background-color: #f8f9fa;
}

/* Hover en filas */
.movimientos-table tbody tr:hover {
    background-color: rgba(0, 212, 255, 0.1);
    transition: background-color 0.3s ease;
}

/* Mensaje sin datos */
.no-data {
    text-align: center;
    padding: 3rem;
    color: #6c757d;
    font-size: 1.1rem;
}

/* Botón recargar */
.btn-recargar {
    background: transparent;
    color: #1a1a2e;
    border: 2px solid #1a1a2e;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-recargar:hover {
    background-color: #1a1a2e;
    color: white;
    transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
    .page-container {
        margin: 1rem;
        padding: 1rem;
    }
    
    .page-title {
        font-size: 1.5rem;
    }
    
    .movimientos-table th,
    .movimientos-table td {
        padding: 0.5rem;
        font-size: 0.85rem;
    }
    
    .movimientos-table th {
        font-size: 0.75rem;
    }
}
</style>