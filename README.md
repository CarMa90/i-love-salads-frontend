# 🥗 I Love Salads - Frontend

Frontend de la aplicación de pedidos online para ensaladas, baguettes, sopas y bebidas. La app incluye un flujo completo de autenticación, carrito, gestión de órdenes y un panel de administración para roles de cliente, restaurante y administrador.

## 🌐 Proyecto desplegado

- [Aplicación principal](https://ilovesalads.heise.cl)
- [Backoffice](https://ilovesalads.heise.cl/backoffice)

La interfaz está conectada a un backend remoto para manejar usuarios, sesiones, productos y órdenes.

## ✨ Funcionalidades actuales

- 🛒 Carrito de compras con almacenamiento local
- 🧾 Catálogo de productos por categorías
- 🔐 Registro e inicio de sesión de clientes
- 🏪 Registro de restaurantes con tipo de usuario `restaurant`
- 🛡️ Rutas protegidas según rol (`client`, `admin`, `restaurant`)
- 📊 Backoffice para visualizar y gestionar órdenes
- 🧾 Vista de detalle y cancelación de pedidos
- 🔔 Popups de error, éxito y mensajes informativos
- ⏳ Indicador de carga durante peticiones
- 📱 Diseño responsive para desktop y mobile
- 🖨️ Soporte de impresión para documentación de pedidos

## 🛠️ Stack tecnológico

- React 19
- Vite 8
- React Router DOM 7
- ESLint
- CSS3 / estilos modulares por componente
- Lucide React
- React To Print

## 📋 Requisitos previos

- Node.js 18+ (recomendado 20 LTS)
- npm

## 🚀 Instalación y uso

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd i-love-salads-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la URL del backend:

```bash
VITE_API_URL=http://localhost:3000
```

Si usás un backend remoto, reemplazá la URL por la del servidor correspondiente.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La app quedará disponible en:

```text
http://localhost:5173
```

### 5. Build para producción

```bash
npm run build
```

### 6. Preview del build

```bash
npm run preview
```

### 7. Ejecutar lint

```bash
npm run lint
```

### 8. Deploy a GitHub Pages

```bash
npm run deploy
```

## 🧭 Rutas principales

- `/` - Catálogo principal para clientes
- `/signin` - Inicio de sesión
- `/signup` - Registro de cliente
- `/restaurant/signup` - Registro de restaurante
- `/backoffice` - Panel administrativo para `admin` y `restaurant`
- `*` - Redirección a inicio

## 🔐 Flujos de acceso

### Cliente

- Puede navegar por el catálogo
- Agregar productos al carrito
- Confirmar pedidos
- Ver y gestionar sus órdenes

### Administrador / Restaurante

- Acceden al backoffice
- Consultan órdenes
- Actualizan estados de pedidos
- Gestionan cancelaciones y seguimiento

## 📁 Estructura del proyecto

```text
src/
├── assets/                 # Imágenes y recursos estáticos
├── components/             # Componentes de UI y vistas
│   ├── App.jsx             # Enrutamiento principal y estado global
│   ├── Header/             # Encabezados
│   ├── Login/              # Login
│   ├── Register/           # Registro de cliente
│   ├── RestaurantRegister/
│   ├── ProductSection/     # Catálogo y productos
│   ├── OrdersTable/        # Gestión de pedidos
│   ├── Popup/              # Modales y notificaciones
│   ├── Footer/             # Footer
│   ├── Loader/             # Loader
│   └── ProtectedRoute/     # Protección de rutas
├── constants/              # Datos constantes (categorías, productos)
├── contexts/               # Context API
│   ├── ProductsContext.jsx
│   └── UserContext.jsx
├── hooks/                  # Hooks reutilizables
├── utils/                  # Utilidades de autenticación y helpers
│   ├── auth.js
│   ├── MainApi.js
│   ├── token.js
│   ├── cartItems.js
│   └── formValidations.js
├── vendor/                 # Fuentes y normalización
├── index.css               # Estilos globales
├── main.jsx                # Bootstrap de la app
└── App.css                 # Estilos principales
```

## 🔗 API esperada

La app consume endpoints del backend relacionados con:

- `/signup`
- `/signin`
- `/users/me`
- `/orders`

El valor de `VITE_API_URL` debe apuntar al backend base para que todas estas rutas queden resueltas correctamente.

## 🐛 Consideraciones

- El proyecto usa `BrowserRouter` con `basename={import.meta.env.BASE_URL}` para compatibilidad con despliegues en GitHub Pages.
- La lógica de acceso y redirecciones está centralizada en `App.jsx` y `ProtectedRoute.jsx`.
- Los tokens se guardan en localStorage mediante `token.js`.

**Hecho con ❤️ para amantes de las ensaladas.**
