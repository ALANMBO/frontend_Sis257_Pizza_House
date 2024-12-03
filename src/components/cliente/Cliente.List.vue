<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref, computed } from 'vue'

const ENDPOINT = 'clientes'
let clientes = ref<Cliente[]>([])
const emit = defineEmits(['edit'])
const clienteDelete = ref<Cliente | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const searchQuery = ref('')

async function obtenerLista() {
  clientes.value = await http.get(ENDPOINT).then((response) => response.data)
}

const clientesFiltrados = computed(() => {
  const lowerQuery = searchQuery.value.toLowerCase()
  return clientes.value.filter((cliente) =>
    cliente.nombres.toLowerCase().includes(lowerQuery) ||
    cliente.apellidos.toLowerCase().includes(lowerQuery) ||
    cliente.direccion.toLowerCase().includes(lowerQuery) ||
    cliente.celular.toLowerCase().includes(lowerQuery)
  )
})

function emitirEdicion(cliente: Cliente) {
  emit('edit', cliente)
}

function mostrarEliminarConfirm(cliente: Cliente) {
  clienteDelete.value = cliente
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${clienteDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`
}
</script>

<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar por nombre, apellido, dirección o celular"
      class="p-inputtext p-component"
      style="width: 50%; margin-top: 20px; margin-bottom: 20px"
    />

    <div class="clientes-grid">
      <div
        v-for="(cliente, index) in clientesFiltrados"
        :key="cliente.id"
        class="cliente-card"
      >
        <div class="cliente-header">
          <h3>{{ cliente.nombres }} {{ cliente.apellidos }}</h3>
          <p>{{ cliente.direccion }}</p>
        </div>
        <div class="cliente-body">
          <p><strong>Celular:</strong> {{ cliente.celular }}</p>
          <p><strong>Fecha de Registro:</strong> {{ formatDate(cliente.fechaCreacion) }}</p>
        </div>
        <div class="cliente-actions">
          <Button icon="pi pi-pencil" aria-label="Editar" @click="emitirEdicion(cliente)" />
          <Button icon="pi pi-trash" aria-label="Eliminar" @click="mostrarEliminarConfirm(cliente)" />
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
.clientes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
}

.cliente-card {
  background-color: #333;
  color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cliente-header h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: white;
}

.cliente-header p {
  font-size: 14px;
  margin-bottom: 16px;
  color: white;
}

.cliente-body p {
  margin: 4px 0;
  color: white;
}

.cliente-actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.cliente-actions .p-button {
  margin: 0 4px;
}
</style>
