<template>
    <div class="page-container">
        <h1 class="page-title">Alta de Cliente</h1>
        <form @submit.prevent="altaCliente" class="form-container">
            <div class="input-group">
                <label class="form-label">Nombre completo</label>
                <input type="text" class="form-control" v-model="cliente.nombre" required placeholder="Nombre">
            </div>
            <div class="input-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="cliente.email" required placeholder="Email">
            </div>
            <button type="submit" class="btn-guardar">Guardar Cliente</button>
        </form>
        <button @click="mostrarClientes" class="btn-secundario">Mostrar Clientes</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCliente } from '../composables/ClienteComposable';

const { guardarCliente, obtenerClientes } = useCliente();
const router = useRouter();

const cliente = ref({
    nombre: '',
    email: ''
})

const mostrarClientes = async () => {
    const res = await obtenerClientes();
    console.log(res);
}

const altaCliente = async () => {
    try {
        const res = await guardarCliente(cliente.value);
        alert('Cliente creado correctamente');
        cliente.value = { nombre: '', email: '' };
        router.push('/cliente');
    } catch (error) {
        console.log(error);
    }
}
</script>
