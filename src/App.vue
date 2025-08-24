<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <h1 class="logo">Cripto Wallet</h1>
    <nav class="nav">
      <!-- <RouterLink to="/" class="nav-link">Inicio</RouterLink> -->
      <RouterLink to="/comprar" class="nav-link">Comprar</RouterLink>
      <RouterLink to="/vender" class="nav-link">Vender</RouterLink>
      <RouterLink to="/movimiento" class="nav-link">Movimientos</RouterLink>
      <RouterLink to="/cliente" class="nav-link">Cliente</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

/* Header principal */
.header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Logo */
.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

/* Navegación */
.nav {
  display: flex;
  gap: 2rem;
}

/* Enlaces de navegación */
.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #00d4ff;
  transform: translateY(-2px);
}

/* Enlace activo */
.nav-link.router-link-active {
  background-color: #00d4ff;
  color: #1a1a2e;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>