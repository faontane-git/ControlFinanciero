// Crear un archivo separado para tipos (types.ts)
export type Movimiento = {
  id: string;
  tipo: 'Ingreso' | 'Gasto';
  monto: number;
  descripcion: string;
  fecha?: Date; // Nueva propiedad para manejar fechas
  categoria?: string; // Nueva propiedad para categorizar
};

export type DatoGraficoBarras = {
  x: string;
  y: number;
};

export type DatoGraficoTorta = {
  x: string;
  y: number;
  color?: string;
};