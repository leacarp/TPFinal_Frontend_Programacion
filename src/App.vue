<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <h1 class="logo">Cripto Wallet</h1>
    <nav class="nav">
      <RouterLink to="/comprar" class="nav-link">Comprar</RouterLink>
      <RouterLink to="/vender" class="nav-link">Vender</RouterLink>
      <RouterLink to="/movimiento" class="nav-link">Movimientos</RouterLink>
      <RouterLink to="/cliente" class="nav-link">Cliente</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>