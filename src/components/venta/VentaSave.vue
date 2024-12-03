<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import type { Producto } from '@/models/producto'
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'
import type { Venta } from '@/models/venta'

const ENDPOINT = 'ventas'

const props = defineProps({
  mostrar: Boolean,
  venta: {
    type: Object as () => Venta,
    default: () => ({}) as Venta
  },
  modoEdicion: Boolean
})

const emit = defineEmits(['guardar', 'close', 'eliminar'])

const venta = ref<Venta>({
  ...props.venta,
  producto: {} as Producto,
  cliente: {} as Cliente,
  empleado: {} as Empleado
})
const clientes = ref<Cliente[]>([])
const productos = ref<Producto[]>([])
const empleados = ref<Empleado[]>([])

watch(
  () => props.venta,
  (newVal) => {
    venta.value = { ...newVal }
  },
  { immediate: true }
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

async function obtenerDatos() {
  try {
    const clientesResponse = await http.get('clientes')
    clientes.value = clientesResponse.data

    const productosResponse = await http.get('productos')
    productos.value = productosResponse.data

    const empleadosResponse = await http.get('empleados')
    empleados.value = empleadosResponse.data
  } catch (error) {
    console.error('Error al cargar los datos:', error)
  }
}

async function handleSave() {
  if (
    !venta.value.cliente ||
    !venta.value.producto ||
    !venta.value.cantidad ||
    !venta.value.precioUnitario ||
    !venta.value.empleado
  ) {
    alert('Por favor, complete todos los campos.')
    return
  }
  try {
    const body = {
      cantidad: venta.value.cantidad,
      precioUnitario: venta.value.precioUnitario,
      totalVenta: venta.value.totalVenta,
      fechaCreacion: venta.value.fechaCreacion,
      idCliente: venta.value.cliente?.id,
      idProducto: venta.value.producto?.id,
      idEmpleado: venta.value.empleado?.id
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${venta.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    venta.value = {} as Venta
    dialogVisible.value = false

    await obtenerDatos()
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar la venta')
  }
}

async function handleDelete() {
  try {
    await http.delete(`${ENDPOINT}/${venta.value.id}`)
    emit('eliminar')
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al eliminar la venta')
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) obtenerDatos()
  }
)

watch(
  () => [venta.value.cantidad, venta.value.precioUnitario],
  ([nuevaCantidad, nuevoPrecioUnitario]) => {
    venta.value.totalVenta = (nuevaCantidad || 0) * (nuevoPrecioUnitario || 0)
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Venta' : 'Crear Venta'"
      style="width: 25rem"
    >
      <!-- Cliente -->
      <div class="flex items-center gap-4 mb-4">
        <label for="cliente" class="font-semibold w-4">Cliente</label>
        <Select
          id="cliente"
          v-model="venta.cliente"
          :options="clientes"
          optionLabel="nombreCompleto"
          class="flex-auto"
          placeholder="Seleccione un cliente"
        />
      </div>

      <!-- Producto -->
      <div class="flex items-center gap-4 mb-4">
        <label for="producto" class="font-semibold w-4">Producto</label>
        <Select
          id="producto"
          v-model="venta.producto"
          :options="productos"
          optionLabel="nombre"
          class="flex-auto"
          placeholder="Seleccione un producto"
        />
      </div>

      <!-- Cantidad -->
      <div class="flex items-center gap-4 mb-4">
        <label for="cantidad" class="font-semibold w-4">Cantidad</label>
        <InputNumber id="cantidad" v-model="venta.cantidad" class="flex-auto" :min="1" />
      </div>

      <!-- Precio Unitario -->
      <div class="flex items-center gap-4 mb-4">
        <label for="precioUnitario" class="font-semibold w-4">Precio Unitario (Bs.)</label>
        <InputNumber
          id="precioUnitario"
          v-model="venta.precioUnitario"
          class="flex-auto"
          :min="0"
        />
      </div>

      <!-- Total Venta -->
      <div class="flex items-center gap-4 mb-4">
        <label for="totalVenta" class="font-semibold w-4">Total Venta (Bs.)</label>
        <InputNumber
          id="totalVenta"
          v-model="venta.totalVenta"
          class="flex-auto"
          :min="0"
          disabled
        />
      </div>

    <!--   Empleado -->
      <div class="flex items-center gap-4 mb-4">
        <label for="empleado" class="font-semibold w-4">Empleado</label>
        <Select
          id="empleado"
          v-model="venta.empleado"
          :options="empleados"
          optionLabel="nombreCompleto"
          class="flex-auto"
          placeholder="Seleccione un Empleado"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="danger"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
        <Button
          v-if="props.modoEdicion"
          type="button"
          label="Eliminar"
          icon="pi pi-trash"
          severity="danger"
          @click="handleDelete"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
