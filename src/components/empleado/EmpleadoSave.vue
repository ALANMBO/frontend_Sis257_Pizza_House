<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'empleados'

const props = defineProps({
  mostrar: Boolean,
  empleado: {
    type: Object as () => Empleado,
    default: () => ({}) as Empleado
  },
  modoEdicion: Boolean
})

const emit = defineEmits(['guardar', 'close', 'eliminar'])

const empleado = ref<Empleado>({ ...props.empleado })

watch(
  () => props.empleado,
  (newVal) => {
    empleado.value = { ...newVal }
  },
  { immediate: true }
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

async function handleSave() {
  // Validar que los campos no estén vacíos
  if (!empleado.value.nombres || empleado.value.nombres.trim() === '') {
    alert('El campo "Nombres" no puede estar vacío.')
    return
  }

  if (!empleado.value.apellidos || empleado.value.apellidos.trim() === '') {
    alert('El campo "Apellidos" no puede estar vacío.')
    return
  }

  if (!empleado.value.cargo || empleado.value.cargo.trim() === '') {
    alert('El campo "Cargo" no puede estar vacío.')
    return
  }

  if (empleado.value.salario === undefined || empleado.value.salario <= 0) {
    alert('El campo "Salario" debe ser mayor que cero.')
    return
  }

  if (!empleado.value.fechaContratacion) {
    alert('El campo "Fecha de Contratación" no puede estar vacío.')
    return
  }

  // Validar que no exista un empleado con el mismo nombre y apellidos
  const empleadoExistente = await obtenerEmpleadosExistentes()
  const empleadoDuplicado = empleadoExistente.some(
    (e) =>
      e.nombres.trim().toLowerCase() === empleado.value.nombres.trim().toLowerCase() &&
      e.apellidos.trim().toLowerCase() === empleado.value.apellidos.trim().toLowerCase() &&
      (!props.modoEdicion || e.id !== empleado.value.id) // Excluir el empleado actual al editar
  )

  if (empleadoDuplicado) {
    alert('Ya existe un empleado con este nombre y apellidos.')
    return
  }

  try {
    const body = {
      nombres: empleado.value.nombres,
      apellidos: empleado.value.apellidos,
      cargo: empleado.value.cargo,
      salario: empleado.value.salario,
      fechaContratacion: empleado.value.fechaContratacion
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${empleado.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    empleado.value = {} as Empleado
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el empleado')
  }
}

async function obtenerEmpleadosExistentes() {
  try {
    const response = await http.get(ENDPOINT)
    return response.data as Empleado[]
  } catch (error) {
    console.error('Error al obtener empleados:', error)
    return []
  }
}

</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar Empleado' : 'Crear Empleado'" style="width: 25rem">
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombres</label>
        <InputText
          id="nombre"
          v-model="empleado.nombres"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="apellidos" class="font-semibold w-4">Apellidos</label>
        <InputText
          id="apellidos"
          v-model="empleado.apellidos"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="cargo" class="font-semibold w-4">Cargo</label>
        <InputText
          id="cargo"
          v-model="empleado.cargo"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="salario" class="font-semibold w-4">Salario</label>
        <InputNumber
          id="salario"
          v-model="empleado.salario"
          class="flex-auto"
          :min="0"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="fechaContratacion" class="font-semibold w-4">Fecha de Contratación</label>
        <Calendar
          id="fechaContratacion"
          v-model="empleado.fechaContratacion"
          class="flex-auto"
        />
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" icon="pi pi-times" severity="danger" @click="dialogVisible = false"/>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
        <Button v-if="props.modoEdicion" type="button" label="Eliminar" icon="pi pi-trash" severity="danger" @click="handleDelete"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.custom-cancel-button {
  background-color: #e74c3c;
  border: none;
  color: white;
}
</style>
