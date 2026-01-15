# Decisiones Técnicas

Este documento describe las decisiones técnicas importantes tomadas durante el desarrollo del proyecto.

## Stack Tecnológico

### React 18+ con TypeScript
**Decisión**: Usar React 18+ con TypeScript en modo estricto.

**Justificación**:
- TypeScript proporciona seguridad de tipos y mejor experiencia de desarrollo
- React 18 ofrece mejoras de rendimiento y nuevas características como Suspense
- Modo estricto asegura mejor calidad de código

### Vite como Build Tool
**Decisión**: Usar Vite en lugar de Create React App o Webpack.

**Justificación**:
- Vite ofrece tiempos de compilación extremadamente rápidos
- Mejor experiencia de desarrollo con HMR instantáneo
- Configuración más simple y moderna
- Mejor soporte para TypeScript y ES modules

## Sistema de Estilos

### Tailwind CSS
**Decisión**: Usar Tailwind CSS para estilos.

**Justificación**:
- Desarrollo rápido con clases utility
- Consistencia visual mediante sistema de diseño
- Mejor rendimiento (tree-shaking de CSS no usado)
- Facilita mantenimiento y escalabilidad
- Mobile-first por defecto
- No requiere archivos CSS separados para cada componente

**Alternativas consideradas**:
- CSS Modules: Rechazado por requerir más archivos y configuración
- Styled Components: Rechazado por overhead de runtime y complejidad adicional

## Gestión de Estado

### Context API + Custom Hooks
**Decisión**: Usar Context API para estado global y custom hooks para lógica de negocio.

**Justificación**:
- Simplicidad para el tamaño del proyecto
- No requiere librerías adicionales
- Custom hooks encapsulan lógica reutilizable
- Suficiente para las necesidades actuales del proyecto

**Alternativas consideradas**:
- Zustand: Considerado pero no necesario para el alcance inicial
- Redux Toolkit: Rechazado por complejidad innecesaria para este proyecto

## Manejo de Formularios

### React Hook Form + Zod
**Decisión**: Usar React Hook Form para manejo de formularios y Zod para validación.

**Justificación**:
- React Hook Form ofrece mejor rendimiento que Formik
- Validación con Zod permite schemas reutilizables y type-safe
- Integración perfecta con TypeScript
- Menos re-renders que soluciones alternativas
- Validación tanto en cliente como posibilidad de compartir schemas con backend

## HTTP Client

### jQuery AJAX
**Decisión**: Usar jQuery AJAX en lugar de fetch o axios.

**Justificación**:
- Requerimiento específico del proyecto según las reglas del repositorio
- Compatibilidad con sistemas legacy si es necesario
- API simple y conocida

**Nota**: En un proyecto nuevo, se recomendaría usar fetch nativo o axios, pero se sigue el requerimiento del proyecto.

## Autenticación

### Tokens JWT en localStorage
**Decisión**: Almacenar tokens JWT en localStorage.

**Justificación**:
- Simplicidad de implementación
- Compatible con Azure AD B2C
- Fácil acceso desde cualquier parte de la aplicación

**Consideraciones de seguridad**:
- TODO: Implementar refresh token automático
- TODO: Considerar httpOnly cookies para producción
- TODO: Implementar expiración y renovación de tokens

## Routing

### React Router DOM v6
**Decisión**: Usar React Router v6 con configuración basada en arrays.

**Justificación**:
- Versión más reciente con mejor API
- Configuración declarativa con arrays
- Mejor soporte para nested routes
- useRoutes hook permite configuración centralizada

## Lazy Loading

### Estrategia Selectiva
**Decisión**: Implementar lazy loading solo para rutas grandes o componentes pesados.

**Justificación**:
- Mejora tiempos de carga inicial
- No necesario para todas las rutas (algunas son muy pequeñas)
- Balance entre complejidad y beneficio

**Rutas candidatas para lazy loading**:
- Dashboard (carga datos iniciales)
- Contracts (lista potencialmente grande)
- ContractDetail (componente complejo)

## Estructura de Carpetas

### Organización por Features/Módulos
**Decisión**: Estructura híbrida con separación por tipo de archivo y features.

**Justificación**:
- Facilita encontrar archivos por tipo (components, hooks, services)
- Permite escalabilidad cuando el proyecto crezca
- Sigue convenciones comunes de React
- Barrel exports facilitan imports limpios

## Path Aliases

### Configuración de @/ para imports
**Decisión**: Usar alias `@/` para imports desde `src/`.

**Justificación**:
- Imports más limpios y legibles
- Evita rutas relativas complejas (`../../../`)
- Fácil refactoring
- Configurado tanto en TypeScript como Vite

## Validación

### Zod para Validación de Schemas
**Decisión**: Usar Zod para todas las validaciones.

**Justificación**:
- Type-safe validation
- Schemas reutilizables
- Integración perfecta con React Hook Form
- Posibilidad de compartir schemas con backend
- Mejor que Yup por mejor soporte de TypeScript

## Responsive Design

### Mobile-First Approach
**Decisión**: Diseño mobile-first con Tailwind CSS.

**Justificación**:
- Mejor experiencia en dispositivos móviles
- Tailwind facilita diseño responsive con breakpoints
- Progresive enhancement desde móvil hacia desktop

**Breakpoints utilizados**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Manejo de Errores

### Error Boundaries + Try/Catch en Hooks
**Decisión**: Manejo de errores a nivel de hooks y componentes.

**Justificación**:
- Errores capturados en el punto de origen (hooks)
- Mensajes de error amigables para el usuario
- Logging centralizado en servicios
- TODO: Implementar Error Boundaries para errores de renderizado

## Auto-guardado

### Intervalo de 30 segundos
**Decisión**: Auto-guardar borradores cada 30 segundos.

**Justificación**:
- Balance entre frecuencia y carga del servidor
- Evita pérdida de datos
- No interrumpe el flujo de trabajo del usuario
- TODO: Implementar debounce para evitar guardados innecesarios

## TypeScript

### Modo Estricto Habilitado
**Decisión**: TypeScript en modo estricto con todas las verificaciones habilitadas.

**Justificación**:
- Mejor calidad de código
- Detecta errores en tiempo de compilación
- Mejor autocompletado y refactoring
- Documentación implícita a través de tipos

## Convenciones de Código

### Nombres de Archivos
- Componentes: PascalCase (ej: `ContractCard.tsx`)
- Hooks: camelCase con prefijo `use` (ej: `useGetContracts.ts`)
- Servicios: camelCase con sufijo `.service` (ej: `auth.service.ts`)
- Utilidades: camelCase con sufijo `.utils` (ej: `contract.utils.ts`)

### Estructura de Componentes
1. Imports
2. Tipos/Interfaces
3. Componente principal
4. Exports

### Documentación
- JSDoc para funciones y hooks complejos
- TODOs para funcionalidades pendientes
- Comentarios solo cuando agregan valor
