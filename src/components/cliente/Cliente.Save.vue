<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'clientes'

const props = defineProps({
  mostrar: Boolean,
  cliente: {
    type: Object as () => Cliente,
    default: () => ({}) as Cliente
  },
  modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

const cliente = ref<Cliente>({ ...props.cliente })
const clientesExistentes = ref<Cliente[]>([])

watch(
  () => props.cliente,
  (newVal) => {
    cliente.value = { ...newVal }
  }
)

async function obtenerClientes() {
  try {
    const response = await http.get(ENDPOINT)
    clientesExistentes.value = response.data
  } catch (error) {
    console.error('Error al obtener clientes:', error)
  }
}

async function handleSave() {
  await obtenerClientes()

  // Validar que los campos no estén vacíos
  if (!cliente.value.nombres || cliente.value.nombres.trim() === '') {
    alert('El campo "Nombres" no puede estar vacío.')
    return
  }

  if (!cliente.value.apellidos || cliente.value.apellidos.trim() === '') {
    alert('El campo "Apellidos" no puede estar vacío.')
    return
  }

  if (!cliente.value.direccion || cliente.value.direccion.trim() === '') {
    alert('El campo "Dirección" no puede estar vacío.')
    return
  }

  if (!cliente.value.celular || cliente.value.celular.trim() === '') {
    alert('El campo "Celular" no puede estar vacío.')
    return
  }

  // Validar nombres duplicados
  const nombreDuplicado = clientesExistentes.value.some(
    (c) =>
      c.nombres.trim().toLowerCase() === cliente.value.nombres.trim().toLowerCase() &&
      c.apellidos.trim().toLowerCase() === cliente.value.apellidos.trim().toLowerCase() &&
      (!props.modoEdicion || c.id !== cliente.value.id) // Excluir el cliente actual al editar
  )

  if (nombreDuplicado) {
    alert('El cliente con estos nombres y apellidos ya existe. Por favor, ingrese datos diferentes.')
    return
  }

  try {
    const body = {
      nombres: cliente.value.nombres.trim(),
      apellidos: cliente.value.apellidos.trim(),
      direccion: cliente.value.direccion.trim(),
      celular: cliente.value.celular.trim()
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cliente.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    cliente.value = {} as Cliente // Reiniciar cliente tras guardar
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el cliente')
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) obtenerClientes()
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Cliente' : 'Crear Cliente'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombres</label>
        <InputText
          id="nombre"
          v-model="cliente.nombres"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="apellido" class="font-semibold w-4">Apellidos</label>
        <InputText
          id="apellido"
          v-model="cliente.apellidos"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="direccion" class="font-semibold w-4">Dirección</label>
        <InputText
          id="direccion"
          v-model="cliente.direccion"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="celular" class="font-semibold w-4">Celular</label>
        <InputText id="celular" v-model="cliente.celular" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          class="cancel-button"
          @click="dialogVisible = false"
        />

        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.cancel-button {
  background-color: red !important;
  border-color: red !important;
  color: white !important;
}

.cancel-button:hover,
.cancel-button:focus,
.cancel-button:active {
  background-color: darkred !important;
  border-color: darkred !important;
}
</style>
