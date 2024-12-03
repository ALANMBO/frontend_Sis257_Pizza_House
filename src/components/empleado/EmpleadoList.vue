<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref, computed } from 'vue'

const ENDPOINT = 'empleados'
let empleados = ref<Empleado[]>([])
const emit = defineEmits(['edit'])
const empleadoDelete = ref<Empleado | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const searchTerm = ref('')

async function obtenerLista() {
  empleados.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(empleado: Empleado) {
  emit('edit', empleado)
}

function mostrarEliminarConfirm(empleado: Empleado) {
  empleadoDelete.value = empleado
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${empleadoDelete.value?.id}`)
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

// Computed property para filtrar empleados según el término de búsqueda
const filteredEmpleados = computed(() => {
  return empleados.value.filter((empleado) => {
    const lowerSearchTerm = searchTerm.value.toLowerCase()
    return (
      empleado.nombres.toLowerCase().includes(lowerSearchTerm) ||
      empleado.apellidos.toLowerCase().includes(lowerSearchTerm) ||
      empleado.cargo.toLowerCase().includes(lowerSearchTerm) ||
      empleado.salario.toString().includes(lowerSearchTerm) ||
      formatDate(empleado.fechaContratacion).includes(lowerSearchTerm)
    )
  })
})
</script>

<template>
  <div>
    <!-- Campo de búsqueda -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Buscar por Nombres, Apellidos, Cargo, Salario, Fecha de Contratación"
      class="p-inputtext p-component p-element"
    />

    <div class="empleados-grid">
      <div
        v-for="(empleado, index) in filteredEmpleados"
        :key="empleado.id"
        class="empleado-card"
      >
        <div class="empleado-header">
          <h3>{{ empleado.nombres }} {{ empleado.apellidos }}</h3>
          <p>{{ empleado.cargo }}</p>
        </div>
        <div class="empleado-body">
          <p><strong>Salario:</strong> {{ empleado.salario | currency }}</p>
          <p><strong>Fecha de Contrato:</strong> {{ formatDate(empleado.fechaContratacion) }}</p>
          <p><strong>Fecha de Registro:</strong> {{ formatDate(empleado.fechaCreacion) }}</p>
        </div>
        <div class="empleado-actions">
          <Button icon="pi pi-pencil" aria-label="Editar" @click="emitirEdicion(empleado)" />
          <Button icon="pi pi-trash" aria-label="Eliminar" @click="mostrarEliminarConfirm(empleado)" />
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
.empleados-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
}

.empleado-card {
  background-color: #333;
  color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.empleado-header h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: white;
}

.empleado-header p {
  font-size: 14px;
  margin-bottom: 16px;
  color: white;
}

.empleado-body p {
  margin: 4px 0;
  color: white;
}

.empleado-actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.empleado-actions .p-button {
  margin: 0 4px;
}

input[type="text"] {
  width: 50%;
  padding: 10px;
  margin-top:20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
