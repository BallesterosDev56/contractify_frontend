# Contractify Frontend

Plataforma web para generar y firmar contratos legales válidos mediante inteligencia artificial.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes base (Button, Input, Card, etc.)
│   ├── layout/      # Layouts (AuthLayout, MainLayout)
│   └── contracts/   # Componentes específicos de contratos
├── views/           # Páginas completas
│   ├── public/      # Vistas públicas (Landing, Login, Register)
│   └── private/     # Vistas privadas (Dashboard, Contracts, Settings)
├── hooks/           # Custom hooks
│   ├── api/         # Hooks para llamadas API
│   └── utils/       # Hooks de utilidades
├── services/        # Servicios API con Axios
├── utils/           # Utilidades y helpers
├── types/           # Tipos TypeScript
├── constants/       # Constantes (endpoints, rutas)
└── routes/          # Configuración de rutas
```

## 🛠️ Stack Tecnológico

- **React 18+** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router v6** - Routing
- **React Hook Form + Zod** - Formularios y validación
- **Tailwind CSS** - Estilos
- **Axios** - HTTP client

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter
```

## 🔧 Configuración

### Variables de Entorno

Ver `.env.example` para las variables necesarias:

- `VITE_API_URL` - URL base de la API
- `VITE_AZURE_AD_B2C_*` - Configuración de Azure AD B2C

## 📚 Documentación

- [TECH_DECISIONS.md](./TECH_DECISIONS.md) - Decisiones técnicas
- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios
- [.cursorrules](./.cursorrules) - Reglas del proyecto

## 🎯 Estado del Proyecto

Este proyecto está en fase de estructura inicial. Todos los archivos están creados como esqueletos con TODOs documentados. Ver [CHANGELOG.md](./CHANGELOG.md) para más detalles.

## 📋 Próximos Pasos

1. Implementar integración con backend API
2. Completar formularios dinámicos
3. Implementar generación de contratos con IA
4. Completar sistema de firmas electrónicas
5. Agregar tests

## 🤝 Contribución

Ver las reglas del proyecto en `.cursorrules` antes de contribuir.

## 📄 Licencia

[Especificar licencia]
