const CONFIG_APP = {
    DEFAULT_COUNTRY_CODE: "+51",
    WHATSAPP_BASE_URL: "https://wa.me/",
    LOCAL_STORAGE_KEYS: {
        USERS: "usuarios",
        TEMPLATES: "plantillas",
        RECORDS: "registros",
        COURSES: "cursos",
        STATUSES: "estados"
    },
    DEFAULT_TEMPLATES: [
        { nombre: "Bienvenida", mensaje: "Hola, gracias por contactarnos" },
        { nombre: "Recordatorio", mensaje: "No olvides asistir a la reunión de mañana." },
        { nombre: "Despedida", mensaje: "Te agradecemos tu compromiso con nosotros" }
    ],
    DEFAULT_COURSES: [
        {
            name: "HTML"
        }, 
        {
            name: "CSS"
        }, 
        {
            name: "JavaScript"
        }, 
        {
            name: "Java"
        }
    ],
    DEFAULT_STATUSES: [
        {
            name: "Inicio"
        }, 
        {
            name: "En progreso"
        }, 
        {
            name: "Terminado"
        }
    ],
}