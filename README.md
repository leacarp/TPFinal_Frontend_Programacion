# Cripto Wallet - Frontend

Aplicación frontend en Vue.js para gestionar operaciones de criptomonedas.

## Funcionalidades Implementadas

### Gestión de Movimientos
- **Listar movimientos**: Muestra todos los movimientos en una tabla
- **Editar movimientos**: Permite modificar los datos de un movimiento existente
- **Eliminar movimientos**: Permite eliminar movimientos con confirmación
- **Recargar datos**: Botón para actualizar la lista de movimientos

### Gestión de Clientes (CRUD Completo)
- **Crear clientes**: Formulario para agregar nuevos clientes
- **Listar clientes**: Tabla que muestra todos los clientes registrados
- **Editar clientes**: Permite modificar los datos de un cliente existente
- **Eliminar clientes**: Permite eliminar clientes con confirmación
- **Contador de movimientos**: Muestra cuántos movimientos tiene cada cliente

### Estadísticas y Gráficos
- **Gráfico de barras**: Muestra la cantidad de criptomonedas compradas y vendidas por cada usuario
- **Resumen por usuario**: Calcula el saldo neto de criptomonedas por usuario (compras - ventas)
- **Visualización interactiva**: Gráfico responsive con Chart.js
- **Información detallada**: Leyenda explicativa de los datos mostrados

## Características Técnicas

### Frontend
- **Vue.js 3** con Composition API
- **Vite** como bundler
- **Vue Router** para navegación
- **Axios** para comunicación con el backend
- **Chart.js** para visualización de datos
- **CSS** personalizado con diseño responsive

### Backend (ASP.NET Core)
- **API REST** con endpoints para CRUD completo
- **Entity Framework Core** para acceso a datos
- **SQL Server** como base de datos
- **CORS** configurado para permitir comunicación con frontend
- **Swagger** para documentación de API

## Endpoints del Backend

### Movimientos
- `GET /api/movimiento` - Obtener todos los movimientos
- `POST /api/movimiento` - Crear nuevo movimiento
- `PUT /api/movimiento/{id}` - Editar movimiento existente
- `DELETE /api/movimiento/{id}` - Eliminar movimiento

### Clientes
- `GET /api/cliente` - Obtener todos los clientes
- `POST /api/cliente` - Crear nuevo cliente
- `PUT /api/cliente/{id}` - Editar cliente existente
- `DELETE /api/cliente/{id}` - Eliminar cliente

## Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

## Configuración

Asegúrate de que el backend esté ejecutándose en `https://localhost:7063` antes de usar el frontend.

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── EstadisticasGrafico.vue  # Componente de gráfico
├── composables/         # Composables para lógica de negocio
├── router/             # Configuración de rutas
├── stores/             # Estado global (si se usa)
├── utils/              # Utilidades y helpers
├── views/              # Vistas principales
│   ├── ClienteView.vue      # CRUD de clientes
│   ├── ComprarView.vue      # Compra de criptomonedas
│   ├── EstadisticasView.vue # Vista de estadísticas
│   ├── ListaMovimientos.vue # Lista y gestión de movimientos
│   ├── VenderView.vue       # Venta de criptomonedas
│   └── HomeView.vue         # Página principal
└── App.vue             # Componente raíz
```

## Dependencias Principales

- `vue`: Framework principal
- `vue-router`: Enrutamiento
- `axios`: Cliente HTTP
- `chart.js`: Librería de gráficos
- `vue-chartjs`: Integración de Chart.js con Vue
