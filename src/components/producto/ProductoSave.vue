<script setup lang="ts">
import type { Producto } from '@/models/producto';
import type { Categoria } from '@/models/categoria';
import http from '@/plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import { computed, ref, watch } from 'vue';

const ENDPOINT = 'productos';

const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Producto,
    default: () => ({}) as Producto,
  },
  modoEdicion: Boolean,
});

const emit = defineEmits(['guardar', 'close', 'eliminar']);

const producto = ref<Producto>({ ...props.producto });
const categorias = ref<Categoria[]>([]);
const productosExistentes = ref<Producto[]>([]);

watch(
  () => props.producto,
  (newVal) => {
    producto.value = { ...newVal };
  },
  { immediate: true }
);

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close');
  },
});

async function obtenerCategorias() {
  try {
    const response = await http.get('categorias');
    categorias.value = response.data;
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
}

async function obtenerProductos() {
  try {
    const response = await http.get(ENDPOINT);
    productosExistentes.value = response.data;
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

async function handleSave() {
  if (
    !producto.value.categoria ||
    !producto.value.nombre ||
    !producto.value.descripcion ||
    producto.value.precioUnitario === undefined ||
    producto.value.stock === undefined
  ) {
    alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
    return;
  }

  const nombreDuplicado = productosExistentes.value.some(
    (p) => p.nombre.toLowerCase() === producto.value.nombre.toLowerCase()
  );
  if (nombreDuplicado) {
    alert('El nombre del producto ya existe. Por favor, elija otro nombre.');
    return;
  }

  try {
    const body = {
      idCategoria: producto.value.categoria?.id,
      nombre: producto.value.nombre,
      descripcion: producto.value.descripcion,
      precioUnitario: producto.value.precioUnitario,
      stock: producto.value.stock,
    };

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${producto.value.id}`, body);
    } else {
      await http.post(ENDPOINT, body);
      await updateStock(producto.value.categoria.id, producto.value.stock);
    }

    emit('guardar');
    producto.value = {} as Producto;
    dialogVisible.value = false;
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el producto');
  }
}

async function handleDelete() {
  try {
    await http.delete(`${ENDPOINT}/${producto.value.id}`);
    await updateStock(producto.value.categoria.id, -producto.value.stock);
    emit('eliminar');
    dialogVisible.value = false;
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al eliminar el producto');
  }
}

async function updateStock(categoriaId: number, cantidad: number) {
  try {
    await http.patch(`categorias/${categoriaId}/stock`, { cantidad });
  } catch (error) {
    console.error('Error al actualizar el stock:', error);
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerCategorias();
      obtenerProductos();
    }
  }
);
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar Producto' : 'Crear Producto'" style="width: 25rem">
      <div class="flex items-center gap-4 mb-4">
        <label for="categoria" class="font-semibold w-4">Categoría</label>
        <Select
          id="categoria"
          v-model="producto.categoria"
          :options="categorias"
          optionLabel="nombre"
          class="flex-auto"
          placeholder="Seleccione una categoría"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="producto.nombre"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-4">Descripción</label>
        <InputText
          id="descripcion"
          v-model="producto.descripcion"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-4">Precio  Bs.</label>
        <InputNumber
          id="precio"
          v-model="producto.precioUnitario"
          class="flex-auto"
          :min="0"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="stock" class="font-semibold w-4">Stock</label>
        <InputNumber
          id="stock"
          v-model="producto.stock"
          class="flex-auto"
          :min="0"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" icon="pi pi-times" class="cancel-button" @click="dialogVisible = false" />
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
        <Button v-if="props.modoEdicion" type="button" label="Eliminar" icon="pi pi-trash" severity="danger" @click="handleDelete" />
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

.dialog-header .p-dialog-title {
  color: white;
}
</style>
