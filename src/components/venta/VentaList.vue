<script setup lang="ts">
import type { Venta } from '@/models/venta'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref, computed } from 'vue'

const ENDPOINT = 'ventas'
let ventas = ref<Venta[]>([])
const emit = defineEmits(['edit'])
const ventaDelete = ref<Venta | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const ventaDetallesDialogVisible = ref<boolean>(false)
const ventaDetalles = ref<Venta | null>(null)

const filtroBusqueda = ref('')

async function obtenerLista() {
  ventas.value = await http.get(ENDPOINT).then((response) => response.data)
}

const ventasFiltradas = computed(() => {
  return ventas.value.filter(venta => {
    const busqueda = filtroBusqueda.value.toLowerCase()
    return (
      venta.cliente.nombres.toLowerCase().includes(busqueda) ||
      venta.producto.nombre.toLowerCase().includes(busqueda) ||
      venta.cantidad.toString().includes(busqueda) ||
      venta.precioUnitario.toString().includes(busqueda) ||
      venta.totalVenta.toString().includes(busqueda) ||
      venta.empleado.nombres.toLowerCase().includes(busqueda)
    )
  })
})

function emitirEdicion(venta: Venta) {
  emit('edit', venta)
}

function mostrarEliminarConfirm(venta: Venta) {
  ventaDelete.value = venta
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${ventaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

function mostrarDetalles(venta: Venta) {
  ventaDetalles.value = venta
  ventaDetallesDialogVisible.value = true
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
    <!-- Barra de búsqueda -->
    <div class="busqueda-container">
      <input
        v-model="filtroBusqueda"
        type="text"
        placeholder="Buscar por Cliente, Producto, Cantidad, Precio, Empleado..."
        class="p-inputtext"
      />
    </div>

    <!-- Lista de ventas -->
    <div class="ventas-grid">
      <div v-for="(venta, index) in ventasFiltradas" :key="venta.id" class="venta-card">
        <div class="venta-header">
          <h3>{{ venta.cliente.nombres }}</h3>
          <p>{{ venta.producto.nombre }}</p>
        </div>
        <div class="venta-body">
          <p><strong>Empleado:</strong> {{ venta.empleado.nombres }}</p>
          <p><strong>Cantidad:</strong> {{ venta.cantidad }}</p>
          <p><strong>Precio Unitario:</strong> {{ venta.precioUnitario | currency }}</p>
          <p><strong>Total Venta:</strong> {{ venta.totalVenta | currency }}</p>
          <p><strong>Fecha de Venta:</strong> {{ formatDate(venta.fechaCreacion) }}</p>
        </div>
        <div class="venta-actions">
          <Button icon="pi pi-pencil" aria-label="Editar" @click="emitirEdicion(venta)" />
          <Button icon="pi pi-eye" label="Venta Detalles" aria-label="Detalles" @click="mostrarDetalles(venta)" />
          <Button icon="pi pi-trash" aria-label="Eliminar" @click="mostrarEliminarConfirm(venta)" />
        </div>
      </div>
    </div>

    <!-- Dialog de Detalles de Venta -->
    <Dialog v-model:visible="ventaDetallesDialogVisible" header="Detalles de Venta" :style="{ width: '30rem' }">
      <div v-if="ventaDetalles" class="venta-detalles">
        <p><strong>Cliente:</strong> {{ ventaDetalles.cliente.nombres }}</p>
        <p><strong>Producto:</strong> {{ ventaDetalles.producto.nombre }}</p>
        <p><strong>Cantidad:</strong> {{ ventaDetalles.cantidad }}</p>
        <p><strong>Precio Unitario:</strong> {{ ventaDetalles.precioUnitario | currency }}</p>
        <p><strong>Total Venta:</strong> {{ ventaDetalles.totalVenta | currency }}</p>
        <p><strong>Fecha de Venta:</strong> {{ formatDate(ventaDetalles.fechaCreacion) }}</p>
      </div>
    </Dialog>

    <!-- Dialog de Confirmación de Eliminación -->
    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.busqueda-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}


.p-inputtext {
  width: 500px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.ventas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
}

.venta-card {
  background-color: #333;
  color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.venta-header h3,
.venta-header p,
.venta-body p {
  color: white;
}

.venta-header h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.venta-header p {
  font-size: 14px;
  margin-bottom: 16px;
}

.venta-body p {
  margin: 4px 0;
}

.venta-actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.venta-actions .p-button {
  margin: 0 4px;
}

.venta-detalles p {
  color: white;
  margin: 10px 0;
}
</style>
