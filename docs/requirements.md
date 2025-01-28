# Documentación: Sistema de Mensajes Predeterminados con WhatsApp API

## 1. Descripción del Negocio

El sistema busca optimizar el flujo de gestión de leads mediante la creación de un dashboard simple que permita administrar usuarios, plantillas y estadísticas relacionadas con el envío de mensajes a través de WhatsApp. Actualmente, las respuestas a los leads son gestionadas manualmente, lo que genera inconsistencias y tiempos de respuesta elevados. Este proyecto plantea una solución centralizada y eficiente.

---

## 2. Problema Actual

### Contexto
- **Gestión manual de usuarios y plantillas:** Los leads son administrados sin herramientas centralizadas.
- **Inconsistencia en los mensajes:** Falta de un sistema que estandarice las respuestas.
- **Dificultad en el seguimiento:** No hay un registro de las interacciones con los leads.

### Solución Propuesta
- Crear un dashboard simple dividido en tres secciones principales: usuarios, plantillas y estadísticas.
- Usar `localStorage` para gestionar y persistir datos de usuarios, plantillas y métricas.
- Integrar funcionalidades básicas para cargar datos, generar URLs y realizar seguimientos.

---

## 3. Especificación Técnica

### Estructura de Datos
1. **Usuarios:**
   - Información: Nombre, apellido, WhatsApp, curso (opcional).
   - Almacenamiento en `localStorage` como array.
2. **Plantillas:**
   - Información: Nombre de la plantilla, mensaje predefinido.
   - Almacenamiento en `localStorage` como array.
3. **Interacciones:**
   - Información: Usuario, plantilla utilizada, fecha de envío.
   - Almacenamiento en `localStorage` como array.

### Funcionalidades
1. **Gestión de Usuarios:**
   - Carga de usuarios por lotes desde un archivo CSV.
   - Visualización en tabla con acciones (enviar mensaje).
   - Generación de URLs para WhatsApp y copia al portapapeles.

2. **Gestión de Plantillas:**
   - Creación de plantillas mediante un formulario.
   - Visualización de plantillas en tabla editable.

3. **Dashboard de Estadísticas:**
   - Conteo de mensajes enviados.
   - Almacenamiento y visualización de métricas (suma incremental por interacción).

### Interacción con WhatsApp API
- Generar URLs personalizadas para mensajes predefinidos.
- Copiar URLs al portapapeles para compartirlas manualmente.

---

## 4. Definición del Alcance

### Funcionalidades Core
- Mostrar la información de los usuarios cargados.

- Subir usuarios masivamente a través de un archivo CSV.

- Crear plantillas de mensajes.

- Mostrar un listado de plantillas de mensajes.

- leccionar un usuario y generar un enlace para enviar mensajes basado en una plantilla.

- Almacenar los mensajes enviados (enlaces generados) en una tabla que relacione el usuario y la plantilla utilizada, incluyendo fecha y hora.

- Editar usuarios, incluyendo la capacidad de agregar etiquetas de seguimiento.

- Agregar iteraciones (notas o actualizaciones) a los usuarios.

### Restricciones Técnicas
- Uso exclusivo de `localStorage` para almacenamiento de datos.
- Acceso al sistema desde navegadores compatibles con WhatsApp Web.

### Entregables Mínimos
- Dashboard funcional con las tres secciones principales.
- Uso de `localStorage` para persistir datos entre sesiones.
- Generación de URLs para WhatsApp basada en plantillas seleccionadas.

---

## 5. Wireframes y Bocetos

### Mapa del Sitio
1. Usuarios
2. Plantillas
3. Dashboard de Estadísticas

### Interfaces de Baja Fidelidad
#### Usuarios
- Tabla de usuarios con columnas:
  - Nombre
  - WhatsApp
  - Acciones (Enviar mensaje).
- Botón para cargar CSV.

#### Plantillas
- Formulario para crear plantillas:
  - Nombre de la plantilla.
  - Mensaje predefinido.
- Tabla de plantillas existentes.

#### Dashboard
- Visualización de métricas:
  - Número total de mensajes enviados.
  - Número de usuarios contactados.

### Flujos
1. **Carga de Usuarios:**
   - Seleccionar archivo CSV.
   - Mostrar usuarios cargados en la tabla.

2. **Generación de Mensajes:**
   - Seleccionar usuario y plantilla.
   - Generar URL personalizada y copiarla al portapapeles.

3. **Actualización de Métricas:**
   - Incrementar el contador de mensajes enviados por cada interacción.

---

## 6. Revisión General
- La solución es local, basada en almacenamiento `localStorage`.
- Diseñada para equipos pequeños (220 leads por semana).
- Compatible con WhatsApp Web y aplicaciones de escritorio.

---



