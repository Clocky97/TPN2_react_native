export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';
  icono: string;
  imagen?: string;
}

export const PLATOS: Plato[] = [
  { id: 1, nombre: 'Café con Leche y 2 Medialunas', precio: 1500, descripcion: 'Café caliente con leche entera y medialunas artesanas de manteca.', categoria: 'desayuno', icono: 'coffee' },
  { id: 2, nombre: 'Tostado de Jamón y Queso', precio: 2200, descripcion: 'Pan miga tostado con queso cremoso y paleta especial.', categoria: 'desayuno', icono: 'sandwich' },
  { id: 3, nombre: 'Chipá Casero (3 unidades)', precio: 1200, descripcion: 'Tradicionales chipás formoseños recién horneados.', categoria: 'desayuno', icono: 'cookie' },
  { id: 4, nombre: 'Milanesa con Papas Fritas', precio: 4500, descripcion: 'Milanesa de carne vacuna con porción de papas fritas crujientes.', categoria: 'almuerzo', icono: 'beef' },
  { id: 5, nombre: 'Empanada de Carne (unidad)', precio: 1000, descripcion: 'Empanada cortada a cuchillo frita o al horno.', categoria: 'almuerzo', icono: 'flame' },
  { id: 6, nombre: 'Plato del Día: Guiso de Fideos', precio: 3800, descripcion: 'Guiso casero abundante con verduras y carne.', categoria: 'almuerzo', icono: 'soup' },
  { id: 7, nombre: 'Agua Mineral 500ml', precio: 1000, descripcion: 'Agua mineral nativa sin gas.', categoria: 'bebidas', icono: 'droplet' },
  { id: 8, nombre: 'Gaseosa 500ml', precio: 1500, descripcion: 'Línea Coca-Cola, Sprite o Fanta helada.', categoria: 'bebidas', icono: 'cup-soda' },
  { id: 9, nombre: 'Jugo Natural de Naranja', precio: 1800, descripcion: 'Exprimido de naranja natural de 400ml.', categoria: 'bebidas', icono: 'citrus' },
  { id: 10, nombre: 'Alfajor Marplatense', precio: 1100, descripcion: 'Alfajor cubierto con chocolate amargo y dulce de leche.', categoria: 'kiosco', icono: 'cake' },
  { id: 11, nombre: 'Paquete de Galletitas', precio: 900, descripcion: 'Galletitas dulces surtidas.', categoria: 'kiosco', icono: 'cookie' },
  { id: 12, nombre: 'Barra de Cereal', precio: 700, descripcion: 'Barra con frutos secos y miel.', categoria: 'kiosco', icono: 'wheat' }
];