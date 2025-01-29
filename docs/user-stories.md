### Historia de Usuario: Cargar Usuarios Masivamente
**Como** administrador  
**Quiero** cargar usuarios de forma masiva desde un archivo CSV  
**Para** ahorrar tiempo y evitar la entrada manual de datos.  

#### Criterios de Aceptación:
1. **Dado** que tengo un archivo CSV con información de usuarios  
   **Cuando** selecciono y subo el archivo  
   **Entonces**  los datos de los usuarios se almacenan en el sistema y se muestran en la tabla de usuarios.

#### Notas Técnicas:
- Componentes necesarios: Botón de carga de archivo, lector de archivos CSV, función de análisis de datos, función de almacenamiento en local storage.
- Modelos de datos: Estructura de datos para usuarios en local storage (array de objetos con nombre, apellido, correo opcional y WhatsApp).
- Interacciones: El botón de carga activa el lector de CSV, se analizan los datos y se guardan en local storage, luego se actualiza la tabla de usuarios.

---

### Historia de Usuario: Creación de Plantillas de Mensajes

**Como** agente de marketing,

**Quiero** crear plantillas de mensajes personalizadas,

**Para** responder rápidamente y de forma consistente a los leads.

### Criterios de Aceptación:

1. **Dado** que estoy en la sección de plantillas 
   **Cuando** completo el formulario para crear una plantilla con el texto deseado, 
   **Entonces** la plantilla se guarda en el sistema y se muestra en la tabla de plantillas.

### Notas Técnicas:

- Componentes necesarios: Formulario de creación de plantillas (campo de texto), botón de guardar, función de almacenamiento en local storage.

- Modelos de datos: Estructura de datos para plantillas en local storage (array de objetos con ID y texto de plantilla).

- Interacciones: El formulario permite ingresar el texto, al guardar se almacena en local storage y se actualiza la tabla de plantillas.

### Mostrar un listado de plantillas de mensajes

**Como** administrador  
**Quiero** ver una lista de las plantillas de mensajes disponibles  
**Para** seleccionar la plantilla adecuada al contactar a un lead  

### Criterios de Aceptación:

1. **Dado** que he creado plantillas de mensaje  
   **Cuando** accedo a la sección de plantillas  
   **Entonces** veo una tabla o lista con todas las plantillas disponibles.  

### Notas Técnicas:

- Componentes necesarios: Tabla o lista de plantillas, lógica para renderizar datos desde local storage.  
- Modelos de datos: Estructura de datos tipo array para almacenar plantillas en local storage, cada plantilla con un campo para el texto del mensaje.  
- Interacciones: Carga inicial de datos desde local storage, renderizado en la tabla o lista.  

### Historia de Usuario: Enviar Mensaje a un Usuario

**Como** agente de ventas,

**Quiero** seleccionar un usuario y enviar un mensaje predeterminado,

**Para** contactar rápidamente al lead y proporcionar información relevante.

### Criterios de Aceptación:

1. **Dado** que estoy en la tabla de usuarios, 
   **Cuando** selecciono un usuario y elijo una plantilla, 
   **Entonces** se genera un link de WhatsApp con el mensaje predeterminado que puedo copiar y enviar.

### Notas Técnicas:

- Componentes necesarios: Acción en la tabla de usuarios, selector de plantilla, generador de URL, función para copiar al portapapeles.

- Modelos de datos: Estructura de datos para usuarios, plantillas y la relación entre ellos en local storage (se debe guardar la asociación entre usuario, plantilla y fecha de envío).

- Interacciones: La acción en la tabla de usuarios abre el selector de plantilla, al elegir plantilla y dar enviar se genera la URL de WhatsApp y se copia al portapapeles y se guarda la información de envío en local storage.

### Historia de Usuario: Etiquetar un Usuario

**Como** analista de datos

**Quiero** etiquetar usuarios con información relevante,

**Para** poder segmentarlos y organizar el seguimiento.

### Criterios de Aceptación:

1. **Dado** que estoy en la tabla de usuarios, 
   **Cuando** selecciono un usuario y defino una etiqueta de seguimiento o de curso, 
   **Entonces** la etiqueta se guarda en el sistema asociada al usuario.

### Notas Técnicas:

- Componentes necesarios: Acción en la tabla de usuarios, formulario para seleccionar la etiqueta, función de actualización de datos en local storage.

- Modelos de datos: Estructura de datos para usuarios en local storage (el objeto usuario debe incluir propiedades para las etiquetas de seguimiento y curso).

- Interacciones: La acción en la tabla abre un formulario para añadir o editar la etiqueta, al guardar se actualiza la información del usuario en local storage.

### Historia de Usuario: Visualizar Métricas en el Dashboard

**Como** gerente de ventas,

**Quiero** ver las métricas de desempeño en un dashboard,

**Para** evaluar la efectividad de las acciones y tomar decisiones.

### Criterios de Aceptación:

1. **Dado** que estoy en el dashboard, 
   **Cuando** consulto la información, 
   **Entonces** se muestran las métricas clave: Tiempo de Respuesta Promedio, Tiempo de Configuración de Mensajes Predeterminados, Tasa de Uso de Mensajes Predeterminados, Tasa de Conversión de Leads y Tasa de Respuesta de Leads.

### Notas Técnicas:

- Componentes necesarios: Gráficos y tablas para mostrar las métricas, función de cálculo de métricas basada en los datos de local storage.

- Modelos de datos: Local Storage debe almacenar toda la información necesaria para calcular las métricas (ej: fecha de envío, respuestas de leads, etc.).

- Interacciones: El dashboard muestra las métricas calculadas a partir de los datos almacenados en el local storage.