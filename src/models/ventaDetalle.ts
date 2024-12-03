import type { Producto } from "./producto";
import type { Venta } from "./venta";

export interface VentaDetalle {
  id: number;
  cantidad: number;
  subtotal: number;
  fechaCreacion: Date;
  venta: Venta;
  producto: Producto;
}
