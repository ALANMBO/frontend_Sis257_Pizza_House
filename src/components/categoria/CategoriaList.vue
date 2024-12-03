<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref, computed } from 'vue'

const ENDPOINT = 'categorias'
let categorias = ref<Categoria[]>([])
const emit = defineEmits(['edit'])
const categoriaDelete = ref<Categoria | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const searchQuery = ref('')

async function obtenerLista() {
  categorias.value = await http.get(ENDPOINT).then((response) => response.data)
}

const categoriasFiltradas = computed(() => {
  const lowerQuery = searchQuery.value.toLowerCase()
  return categorias.value.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(lowerQuery)
  )
})

function emitirEdicion(categoria: Categoria) {
  emit('edit', categoria)
}

function mostrarEliminarConfirm(categoria: Categoria) {
  categoriaDelete.value = categoria
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${categoriaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar por nombre"
      class="p-inputtext p-component"
      style="width: 50%; margin-top: 20px; margin-bottom: 20px"
    />

    <div class="categorias-grid">
      <div
        v-for="(categoria, index) in categoriasFiltradas"
        :key="categoria.id"
        class="categoria-card"
      >
        <div class="categoria-header">
          <h3>{{ categoria.nombre }}</h3>
        </div>
        <div class="categoria-actions">
          <Button icon="pi pi-pencil" aria-label="Editar" @click="emitirEdicion(categoria)" />
          <Button icon="pi pi-trash" aria-label="Eliminar" @click="mostrarEliminarConfirm(categoria)" />
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.categorias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
}

.categoria-card {
  background-color: #2f2f2f;
  border-radius: 8px;
  padding: 16px;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.categoria-header h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.categoria-actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.categoria-actions .p-button {
  margin: 0 4px;
}
</style>
