# 🥗 I Love Salads - Frontend

Plataforma moderna para realizar pedidos online de ensaladas, baguettes, sopas y bebidas. Incluye panel de administración para gestionar órdenes y un sistema completo de carrito de compras.

## 🌐 Proyecto desplegado

- [Aplicación principal](https://CarMa90.github.io/i-love-salads-frontend)
- [Backoffice](https://CarMa90.github.io/i-love-salads-frontend/backoffice)

## ✨ Características

- 🛒 **Carrito de Compras**: Gestión intuitiva de productos seleccionados
- 🎯 **Categorías de Productos**: Organización por tipos (Ensaladas, Baguettes, Sopas, Bebidas)
- 📊 **Panel de Administración**: Interfaz para gestionar órdenes (backoffice)
- ⚡ **Interfaz Responsiva**: Optimizada para dispositivos móviles y desktop
- 🔔 **Notificaciones**: Popups informativos y de error
- ⏳ **Indicador de Carga**: Feedback visual durante operaciones

## 🛠️ Tecnologías

- **React 18+** - Librería UI
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **ESLint** - Linting de código
- **CSS3** - Estilos

## 📋 Requisitos Previos

- Node.js 16+
- npm o yarn

## 🚀 Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone <url-repositorio>
cd i-love-salads-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Build para producción

```bash
npm run build
```

### 5. Preview de producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── App.jsx         # Componente principal
│   ├── Header/         # Encabezado
│   ├── Navigation/     # Navegación
│   ├── ProductSection/ # Sección de productos
│   ├── OrdersTable/    # Tabla de órdenes (backoffice)
│   ├── Popup/          # Sistema de popups
│   │   ├── CartPopup/
│   │   ├── OrderDetailsPopup/
│   │   ├── ErrorPopup/
│   │   └── ...
│   ├── Footer/         # Pie de página
│   └── Loader/         # Indicador de carga
├── contexts/           # Context API
│   ├── ProductsContext.jsx
│   └── UserContext.jsx
├── utils/              # Utilidades
│   ├── api.js         # Llamadas a API
│   └── formValidations.js
├── assets/            # Recursos estáticos
└── vendor/            # Fuentes y normalización
```

## 🎯 Rutas

- `/` - Página principal con catálogo de productos
- `/backoffice` - Panel de administración de órdenes

## 🔗 API

La aplicación se conecta a una API backend para:

- Obtener lista de órdenes
- Crear nuevas órdenes
- Actualizar estado de órdenes
- Gestionar información de usuarios

## 💡 Características Principales

### Cliente

- Explorar menú de productos
- Agregar productos al carrito
- Ver detalles de órdenes previas
- Aceptar o cancelar órdenes

### Administrador

- Ver todas las órdenes
- Cambiar estado de órdenes
- Gestionar cancelaciones
- Monitoreo de pedidos

## 🐛 Linting

```bash
npm run lint
```

**Hecho con ❤️ para amantes de las ensaladas**
