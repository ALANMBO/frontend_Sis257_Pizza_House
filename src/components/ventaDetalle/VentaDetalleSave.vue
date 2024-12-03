<script setup lang="ts">
import type { Venta } from '@/models/venta'
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'detallesVenta'

const props = defineProps({
  mostrar: Boolean,
  detalle: {
    type: Object as () => {
      id: number
      cantidad: number
      subtotal: number
      fechaCreacion: Date
      venta: Venta
      producto: Producto
    },
    default: () => ({
      id: 0,
      cantidad: 0,
      subtotal: 0,
      fechaCreacion: new Date(),
      venta: {} as Venta,
      producto: {} as Producto
    }),
  },
  modoEdicion: Boolean
})

const emit = defineEmits(['guardar', 'close', 'eliminar'])

const detalle = ref({ ...props.detalle })
const productos = ref<Producto[]>([])
const ventas = ref<Venta[]>([])

watch(
  () => props.detalle,
  (newVal) => {
    detalle.value = { ...newVal }
  },
  { immediate: true }
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

async function obtenerProductos() {
  try {
    const response = await http.get('productos')
    productos.value = response.data
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
}

async function obtenerVentas() {
  try {
    const response = await http.get('ventas')
    ventas.value = response.data
  } catch (error) {
    console.error('Error al cargar ventas:', error)
  }
}

async function handleSave() {
  try {
    const body = {
      cantidad: detalle.value.cantidad,
      subtotal: detalle.value.subtotal,
      fechaCreacion: detalle.value.fechaCreacion,
      idProducto: detalle.value.producto.id,
      idVenta: detalle.value.venta.id
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${detalle.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    detalle.value = {} as typeof props.detalle.default
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el detalle')
  }
}

async function handleDelete() {
  try {
    await http.delete(`${ENDPOINT}/${detalle.value.id}`)
    emit('eliminar')
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al eliminar el detalle')
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerProductos()
      obtenerVentas()
    }
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar Detalle Venta' : 'Crear Detalle Venta'" style="width: 30rem">
      <div class="flex items-center gap-4 mb-4">
        <label for="producto" class="font-semibold w-4">Producto</label>
        <Select
          id="producto"
          v-model="detalle.producto"
          :options="productos"
          optionLabel="nombre"
          class="flex-auto"
          placeholder="Seleccione un producto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="cantidad" class="font-semibold w-4">Cantidad</label>
        <InputNumber id="cantidad" v-model="detalle.cantidad" class="flex-auto" :min="1" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="subtotal" class="font-semibold w-4">Subtotal</label>
        <InputNumber id="subtotal" v-model="detalle.subtotal" class="flex-auto" :min="0" mode="currency" currency="BOB" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fecha" class="font-semibold w-4">Fecha</label>
        <Calendar id="fecha" v-model="detalle.fechaCreacion" class="flex-auto" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="venta" class="font-semibold w-4">Venta</label>
        <Select
          id="venta"
          v-model="detalle.venta"
          :options="ventas"
          optionLabel="codigos"
          class="flex-auto"
          placeholder="Seleccione una venta"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary" @click="dialogVisible = false"></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
        <Button v-if="props.modoEdicion" type="button" label="Eliminar" icon="pi pi-trash" severity="danger" @click="handleDelete"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
