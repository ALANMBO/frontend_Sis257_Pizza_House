<script setup lang="ts">
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref, computed } from 'vue'

const ENDPOINT = 'productos'
let productos = ref<Producto[]>([])
const emit = defineEmits(['edit'])
const productoDelete = ref<Producto | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const searchQuery = ref('')

async function obtenerLista() {
  productos.value = await http.get(ENDPOINT).then((response) => response.data)
}

const productosFiltrados = computed(() => {
  return productos.value.filter((producto) => {
    const lowerQuery = searchQuery.value.toLowerCase()
    return (
      producto.nombre.toLowerCase().includes(lowerQuery) ||
      producto.categoria.nombre.toLowerCase().includes(lowerQuery) ||
      producto.descripcion.toLowerCase().includes(lowerQuery) ||
      producto.precioUnitario.toString().includes(lowerQuery) ||
      producto.stock.toString().includes(lowerQuery)
    )
  })
})

function emitirEdicion(producto: Producto) {
  emit('edit', producto)
}

function mostrarEliminarConfirm(producto: Producto) {
  productoDelete.value = producto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${productoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar por categoría, nombre, descripción, precio o stock"
      class="p-inputtext p-component"
      style="width: 50%; margin-top: 20px; margin-bottom: 20px"
    />

    <div class="productos-grid">
      <div v-for="(producto, index) in productosFiltrados" :key="producto.id" class="producto-card">
        <div class="producto-header">
          <h3>{{ producto.nombre }}</h3>
          <p class="text-white"><strong>Categoría:</strong> {{ producto.categoria.nombre }}</p>
        </div>
        <div class="producto-body">
          <p class="text-white"><strong>Descripción:</strong> {{ producto.descripcion }}</p>
          <p class="text-white"><strong>Precio:</strong> {{ producto.precioUnitario }} Bs</p>
          <p class="text-white"><strong>Stock:</strong> {{ producto.stock }}</p>
        </div>
        <div class="producto-footer">
          <p class="text-white">
            <strong>Fecha Registro:</strong> {{ formatDate(producto.fechaCreacion) }}
          </p>
          <p class="text-white">
            <strong>Fecha Modificación:</strong> {{ formatDate(producto.fechaModificacion) }}
          </p>
        </div>
        <div class="producto-actions">
          <Button icon="pi pi-pencil" aria-label="Editar" @click="emitirEdicion(producto)" />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            @click="mostrarEliminarConfirm(producto)"
          />
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
.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
}

.producto-card {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.producto-header h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.producto-body p {
  margin: 4px 0;
}

.producto-footer {
  margin-top: 12px;
  font-size: 14px;
}

.producto-actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.producto-actions .p-button {
  margin: 0 4px;
}

.text-white {
  color: white !important;
}
</style>
