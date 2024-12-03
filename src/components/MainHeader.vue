<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/index'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login') 
}
</script>

<template>
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="row">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
          </button>
          <a class="navbar-brand" href="#">Pizza House</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav main-nav clear navbar-right horizontal-nav">
            <li><RouterLink to="/">Inicio</RouterLink></li>
            <li><RouterLink to="/producto">Productos</RouterLink></li>
            <li><RouterLink to="/categoria">Categoría</RouterLink></li>
            <li><RouterLink to="/cliente">Cliente</RouterLink></li>
            <li><RouterLink to="/empleado">Empleado</RouterLink></li>
            <li><RouterLink to="/venta">Ventas</RouterLink></li>
            <li>
              <!-- Botón de salir -->
              <button class="logout-button" @click="logout">Salir</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-header {
  float: left;
  position: relative;
  top: 0px;
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: white !important;
  margin-right: -100px;
}

.horizontal-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.horizontal-nav li {
  margin: 0 10px;
}

.horizontal-nav a {
  text-decoration: none;
  color: transparent;
  font-size: 16px;
  transition: color 0.3s ease;
}

.horizontal-nav a:hover,
.horizontal-nav a:focus,
.horizontal-nav a:active {
  color: white !important;
  text-decoration: none;
}

.logout-button {
  background-color: #d9534f;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c9302c;
}
</style>
