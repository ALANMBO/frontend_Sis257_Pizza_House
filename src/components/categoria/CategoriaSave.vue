<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'categorias'

const props = defineProps({
  mostrar: Boolean,
  categoria: {
    type: Object as () => Categoria,
    default: () => ({}) as Categoria
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

const categoria = ref<Categoria>({ ...props.categoria })
const categoriasExistentes = ref<Categoria[]>([])

watch(
  () => props.categoria,
  (newVal) => {
    categoria.value = { ...newVal }
  }
)

async function obtenerCategorias() {
  try {
    const response = await http.get(ENDPOINT)
    categoriasExistentes.value = response.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  }
}

async function handleSave() {
  if (!categoria.value.nombre || categoria.value.nombre.trim() === '') {
    alert('El nombre de la categoría no puede estar vacío.')
    return
  }

  const nombreDuplicado = categoriasExistentes.value.some(
    (c) => c.nombre.toLowerCase() === categoria.value.nombre.toLowerCase()
  )
  if (nombreDuplicado) {
    alert('El nombre de la categoría ya existe. Por favor, elija otro nombre.')
    return
  }

  try {
    const body = {
      nombre: categoria.value.nombre
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${categoria.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    categoria.value = {} as Categoria
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar la categoría')
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) obtenerCategorias()
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="categoria.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          class="cancel-button"
          @click="dialogVisible = false"
        />

        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
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
  background-color: red !important;
  border-color: red !important;
  color: white !important;
}
</style>
