<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// Importar scripts y estilos
import '@/assets/js/jquery-1.10.2.min.js'
import '@/assets/js/bootstrap.min.js'
import '@/assets/js/jquery-1.10.2.js'
import '@/assets/js/jquery.mixitup.min.js'
import '@/assets/js/main.js'

import 'primeicons/primeicons.css'

import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'


const route = useRoute();
const showHeaderFooter = computed(() => route.name !== 'login');
</script>

<template>
  <MainHeader v-if="showHeaderFooter" />
  <RouterView />
  <MainFooter v-if="showHeaderFooter" />
</template>

<style>
/* Importar todos los estilos necesarios */
@import '@/assets/css/bootstrap.css';
@import '@/assets/css/normalize.css';
@import '@/assets/css/main.css';
@import '@/assets/css/style-portfolio.css';
@import '@/assets/css/picto-foundry-food.css';
@import '@/assets/css/jquery-ui.css';
</style>
