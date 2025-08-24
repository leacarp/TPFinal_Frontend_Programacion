<template>
    <div class="page-container">
        <h1 class="page-title">Venta de cripto</h1>
        <form @submit.prevent="altaMovimiento" class="form-container">
            <div class="input-group">
                <label class="form-label">Código de cripto</label>
                <select type="text" class="form-control" v-model="movimiento.cryptocode" required placeholder="Código de cripto">
                    <option v-for="cripto in criptosDisponibles" :key="cripto.value" :value="cripto.value">{{ cripto.label }}</option>
                </select>
            </div>
            <div class="input-group">
                <label class="form-label">Cantidad de cripto</label>
                <input type="number" class="form-control" v-model="movimiento.cryptoamount" required placeholder="Cantidad de cripto">
            </div>
            <div class="input-group">
                <label class="form-label">Nombre del cliente</label>
                <select class="form-control" v-model="movimiento.clienteid" required placeholder="Nombre de cliente">
                    <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}</option>
                </select>
            </div>
            <button type="submit" class="btn-guardar">Realizar Venta</button>
            <button @click="mostrarMovimientos" class="btn-secundario">Mostrar Movimientos</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovimiento } from '../composables/MovimientoComposable';
import { useCliente } from '../composables/ClienteComposable';

const { obtenerClientes } = useCliente();
const { cargarMovimiento } = useMovimiento();
const router = useRouter();
const clientes = ref([]);
const criptosDisponibles = [{ label: 'BTC', value: 'btc' }, { label: 'ETH', value: 'eth' }, { label: 'USDT', value: 'usdt' }, {label: 'USDC', value: 'usdc'}, {  label: 'SOL', value: 'sol'}, { label: 'AVAX', value: 'avax'}, { label: 'DOT', value: 'dot'}]

const movimiento = ref({
    cryptocode: '',
    action: 'sale',
    cryptoamount: null,
    datetime: new Date().toISOString(),
    clienteid: null
})

const mostrarMovimientos = async () => {
    router.push('/movimiento');
}

const altaMovimiento = async () => {
    try {
        if (movimiento.value.cryptoamount <= 0) {
            alert('La cantidad de cripto debe ser mayor a 0');
            return;
        }
        await cargarMovimiento(movimiento.value);
        alert('Movimiento creado correctamente');
        movimiento.value = { cryptocode: '', action: '', cryptoamount: null, datetime: null, clienteid: null };
    } catch (error) {
        alert('Error al realizar la venta');
        console.log(error);
    }
}

const cargarClientes = async () => {
    const res = await obtenerClientes();
    clientes.value = res;
}

onMounted(() => {
    cargarClientes();
})
</script>