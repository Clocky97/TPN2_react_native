# Sistema Comedor IPF — Expo Router (SDK 57)

Aplicación móvil desarrollada con React Native, Expo Router (SDK 57) y TypeScript para la gestión integral de pedidos del comedor del Instituto Politécnico Formosa. El sistema implementa estructuras de datos propias (Pila LIFO y Cola FIFO eficiente) para modelar el flujo de compras y atención de cocina.

---

## Árbol de Carpetas del Proyecto (`src/`)

```text
src/
├── app/
│   ├── _layout.tsx                     (Stack raíz con Stack.Protected y anchor de pestañas)
│   ├── +not-found.tsx                  (Pantalla de error 404 para rutas inexistentes)
│   ├── pedido.tsx                      (Redirección declarativa hacia /carrito)
│   ├── buscar.tsx                      (Buscador con query params en URL y router.setParams)
│   ├── confirmar.tsx                   (Modal de confirmación de pedido con router.replace)
│   ├── login.tsx                      (Modal de autenticación de cocina con Stack.Protected)
│   ├── categorias/
│   │   └── [categoria].tsx             (Ruta dinámica de filtro con validación de categorías)
│   ├── turno/
│   │   └── [numero].tsx                (Detalle de turno, posición en cola y tiempo estimado)
│   ├── ayuda/
│   │   ├── index.tsx                   (Índice principal del centro de ayuda)
│   │   └── [...slug].tsx               (Ruta catch-all para artículos de profundidad variable)
│   ├── (tabs)/
│   │   ├── _layout.tsx                 (Navegador de pestañas inferiores js-tabs con Lucide)
│   │   ├── index.tsx                   (Pestaña Inicio con accesos rápidos temáticos)
│   │   ├── menu/
│   │   │   ├── _layout.tsx             (Stack interno de la pestaña Menú)
│   │   │   ├── index.tsx               (Listado de platos organizados por categorías)
│   │   │   └── [id].tsx                (Detalle dinámico del plato y agregado al carrito)
│   │   └── carrito/
│   │       ├── _layout.tsx             (Stack interno de la pestaña Carrito)
│   │       ├── index.tsx               (Listado de ítems, cálculo de total y Deshacer LIFO)
│   │       └── nota.tsx                (Aclaraciones para cocina en formato formSheet)
│   └── cocina/
│       ├── _layout.tsx                 (Navegador Drawer protegido por sesión de usuario)
│       ├── index.tsx                   (Atención del frente de pedidos en orden Cola FIFO)
│       └── atendidos.tsx               (Historial cronológico inverso en orden Pila LIFO)
├── components/
│   ├── DondeEstoy.tsx                  (Componente de inspección debug: pathname, segments, params)
│   └── PlatoIcon.tsx                   (Renderizado de iconos temáticos mediante lucide-react-native)
├── context/
│   └── AppContext.tsx                  (Estado global con sincronización en tiempo real)
├── data/
│   └── platos.ts                       (Catálogo inicial de 12 platos en 4 categorías)
└── estructuras/
    ├── Pila.ts                         (Implementación de Pila LIFO con campos privados #items)
    └── Cola.ts                         (Implementación de Cola FIFO O(1) con puntero y compactación)
```

---

## Arquitectura de Navegadores y Layouts

1. **Layout Raíz (`src/app/_layout.tsx`):**
   - Implementa el `Stack` exterior que gobierna la aplicación.
   - Protege rutas mediante `Stack.Protected`:
     - `/login` está habilitada únicamente cuando no hay sesión iniciada (`guard={!conSesion}`).
     - `/cocina` está habilitada únicamente cuando existe una sesión activa (`guard={conSesion}`).
   - Establece `unstable_settings = { anchor: '(tabs)' }` para asegurar que el grupo de pestañas quede siempre disponible en la base de la pila de navegación durante un deep link.
   - Envuelve el árbol con `GestureHandlerRootView` y el `AppProvider`.

2. **Navegador de Pestañas (`src/app/(tabs)/_layout.tsx`):**
   - Utiliza `Tabs` importado desde `expo-router/js-tabs`.
   - Incorpora iconos limpios de `lucide-react-native` (`House`, `UtensilsCrossed`, `ShoppingCart`).
   - Muestra un badge numérico dinámico con la cantidad total de artículos agregados en el carrito.

3. **Navegadores Anidados:**
   - **Pestaña Menú (`src/app/(tabs)/menu/_layout.tsx`):** Contiene un `Stack` independiente que permite ingresar al detalle del plato (`/menu/[id]`) manteniendo la barra inferior visible.
   - **Pestaña Carrito (`src/app/(tabs)/carrito/_layout.tsx`):** Contiene un `Stack` interno con la ruta `/carrito/nota` configurada como `presentation: 'formSheet'` y `sheetAllowedDetents: [0.5, 0.85]`.
   - **Sección Cocina (`src/app/cocina/_layout.tsx`):** Implementa un `Drawer` para alternar entre la cola de pedidos pendientes y el historial de pedidos atendidos.

---

## Justificación de Navegación: `router.replace` vs `router.push`

En la pantalla de confirmación (`/confirmar`), una vez que el alumno pulsa el botón **Confirmar y Enviar Pedido**, se ejecuta la transición hacia el turno mediante:

```typescript
router.replace({ pathname: '/turno/[numero]', params: { numero: numeroTurno.toString() } });
```

### Razonamiento técnico:
- **Prevención de reenvíos accidentales:** Si se utilizara `router.push`, la pantalla `/confirmar` permanecería apilada inmediatamente debajo de `/turno/[numero]`. Al presionar el botón "Atrás" del sistema operativo o del header, el usuario regresaría a la pantalla de confirmación, generando confusión y el riesgo de volver a confirmar un pedido ya generado.
- **Limpieza del historial:** Con `router.replace`, la vista modal de confirmación se sustituye por la vista definitiva del turno emitido, eliminando el paso intermedio de la pila de navegación de forma segura y consistente.

---

## Estructuras de Datos Implementadas

- **Pila (`src/estructuras/Pila.ts`):** 
  - Regla LIFO (Last In, First Out).
  - Encapsulamiento estricto con `#items` privado.
  - Métodos: `push`, `pop`, `tope`, `get vacia`, `get tamanio` y `aArray()`.
  - Casos de uso: Deshacer agregados de platos en el carrito e historial de pedidos atendidos en cocina.

- **Cola Eficiente (`src/estructuras/Cola.ts`):** 
  - Regla FIFO (First In, First Out).
  - Operación `desencolar()` con costo temporal constante $O(1)$, evitando el desplazamiento de memoria de `array.shift()`.
  - Control de puntero interno `#inicio` con mantenimiento y compactación periódica mediante `slice`.
  - Métodos: `encolar`, `desencolar`, `frente`, `get vacia`, `get tamanio` y `aArray()`.
  - Caso de uso: Gestión equitativa de turnos de comida por orden de llegada en la cocina.

---

## Deep Link de Prueba para Expo Go

Para verificar el funcionamiento de deep links directos a un producto:

```bash
# Formato para Expo Go en red local
exp://10.254.197.97:8081/--/menu/7

# Formato de esquema personalizado en build independiente
comedoripf://menu/7
```

*Comportamiento observado:* Gracias a la configuración `anchor: '(tabs)'` en `src/app/_layout.tsx`, al abrir este enlace la aplicación monta la pestaña Menú debajo del detalle del plato, permitiendo al usuario utilizar el botón "Atrás" para regresar al listado sin quedar aislado en una pantalla suelta.

---

## Preguntas para la Defensa Oral

### 1. ¿Qué método usaste para pasar de `/confirmar` a `/turno/[numero]` y qué pasaría si usaras `push`?
Se utilizó `router.replace`. Si se hubiese empleado `router.push`, la vista de confirmación quedaría almacenada en el historial de la pila. Al presionar "Atrás", el alumno volvería a la pantalla de confirmación pudiendo duplicar el pedido de manera errónea.

### 2. Si la cocina cierra sesión estando en `/cocina/atendidos`, ¿qué ocurre con esa pantalla? ¿Por qué no hace falta llamar a `router.back()`?
La pantalla se desmonta y desaparece inmediatamente del historial. Esto sucede gracias al componente `<Stack.Protected guard={conSesion}>` en el layout raíz: cuando la sesión pasa a `null`, el guard evalúa a `false`, provocando que Expo Router retire automáticamente del árbol de navegación todas las pantallas hijas sin requerir invocaciones manuales a `router.back()`.

### 3. ¿Por qué "Deshacer" usa una pila y no una cola? ¿Y por qué los pedidos usan una cola y no una pila?
- "Deshacer" requiere revertir la acción más reciente efectuada por el usuario (LIFO - Last In, First Out). La última modificación agregada es la que debe quitarse primero.
- La atención de pedidos requiere que el primer alumno en solicitar comida sea el primero en ser despachado por el personal de cocina (FIFO - First In, First Out) para garantizar el orden de llegada.

### 4. ¿Qué pasa si alguien abre `comedoripf://menu/999`? ¿Y `comedoripf://no-existe`?
- Al abrir `comedoripf://menu/999`, la pantalla `/menu/[id]` valida numéricamente el identificador recibido. Al no encontrar coincidencias en el catálogo de platos, muestra un aviso de error controlado indicando que el plato no existe en la carta.
- Al abrir `comedoripf://no-existe`, el enrutador no encuentra ningún archivo que responda a esa ruta y renderiza automáticamente la pantalla especial `+not-found.tsx` (Error 404).

### 5. Si tocás "Agregar al carrito" y enseguida el link al carrito, ¿en qué orden se procesan esas acciones de navegación y por qué?
Se procesan secuencialmente a través de una cola (Queue) interna de eventos en JavaScript. En primer lugar se procesa el evento del botón actualizando el estado de la pila y del carrito, y a continuación se desencola y despacha la acción de navegación hacia la pestaña del carrito.

### 6. ¿Qué pantalla queda debajo cuando se abre `/categorias/bebidas` desde un deep link? ¿Qué configuración lo decide?
Queda la pantalla base del grupo `(tabs)` (pestaña Inicio). Esta disposición la determina la configuración `export const unstable_settings = { anchor: '(tabs)' }` declarada en `src/app/_layout.tsx`.

---

## Capturas de Pantalla del Sistema

*(Secciones destinadas a la incorporación de capturas requeridas para la entrega)*

### 1. Carrito con función Deshacer (Pila LIFO)
<!-- Insertar captura del carrito con ítems y botón deshacer -->

### 2. Pantalla de Turno con tiempo estimado de espera
<!-- Insertar captura de /turno/[numero] con pedidos adelante y cálculo de tiempo -->

### 3. Cocina atendiendo pedidos en orden de llegada (Cola FIFO)
<!-- Insertar captura del frente de la cola y botón para atender siguiente -->

### 4. Flujo de Login y Logout de personal de cocina
<!-- Insertar captura del modal de login y drawer protegido -->

### 5. Pantalla de Error 404 (`+not-found.tsx`)
<!-- Insertar captura de pantalla 404 al ingresar una ruta inválida -->

---

## Ejecución del Proyecto

```bash
# 1. Instalar dependencias compatibles
npm install

# 2. Iniciar servidor de desarrollo
npx expo start

# Opciones en consola:
# Presionar 'w' para abrir en navegador Web
# Presionar 'a' para abrir en emulador Android
# Escanear el código QR con la aplicación Expo Go en el teléfono
```
