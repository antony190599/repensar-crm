function generateRandomIdentifier(prefix = "") {
    return  `${prefix}_${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
    
}


document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos desde localStorage o inicializar si no existen
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let plantillas = JSON.parse(localStorage.getItem('plantillas')) || [
        { id: generateRandomIdentifier("temp"), nombre: "Bienvenida", mensaje: "Hola, gracias por contactarnos" },
        { id: generateRandomIdentifier("temp"), nombre: "Recordatorio", mensaje: "No olvides asistir a la reunión de mañana." },
        { id: generateRandomIdentifier("temp"), nombre: "Despedida", mensaje: "Te agradecemos tu compromiso con nosotros" }
    ];

    let registros = JSON.parse(localStorage.getItem('registros')) || [
        // Comentar para que no se muestren los registros por defecto
        // { id: generateRandomIdentifier("req"), nombre: "Frabousco", nombrePlantilla: "Bienvenida", mensaje: "¡Hola! gracias por contactarnos" },
        // { id: generateRandomIdentifier("req"),  nombre: "Frabousco", nombrePlantilla: "Recordatorio", mensaje: "No olvides asistir a la reunión de mañana." },
        // { id: generateRandomIdentifier("req"), nombre: "Frabousco", nombrePlantilla: "Despedida", mensaje: "Te agradecemos tu compromiso con nosotros" }
    ];

    // Guardar datos en localStorage
    function guardarDatos() {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('plantillas', JSON.stringify(plantillas));
        localStorage.setItem('registros', JSON.stringify(registros));
    }

    // Navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Listas de cursos y estados disponibles
    let cursosDisponibles = ["HTML", "CSS", "JavaScript", "Java"];
    let estadosDisponibles = ["Inicio", "En progreso", "Terminado"];

    // Función para renderizar la tabla de usuarios
    function renderizarUsuarios() {
        const tbody = document.querySelector("#usuarios tbody");
        tbody.innerHTML = ""; 
    
        if (usuarios.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No hay datos</td>
                </tr>
            `;
            return;
        }
    
        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.whatsapp}</td>
                <td>${usuario.correo}</td>
                <td>
                    <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#crearModal">Crear Etiqueta</button>
                    <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#enviarMensajeModal" onclick="cargarDatosEnviarMensaje('${usuario.id}')">Enviar Mensaje</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.id}', '${usuario.nombre}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para renderizar la tabla de plantillas
    function renderizarPlantillas() {
        const tbody = document.querySelector("#plantillas tbody");
        tbody.innerHTML = ""; 

        if (plantillas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center">No hay datos</td>
                </tr>
            `;
            return;
        }

        plantillas.forEach(plantilla => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${plantilla.nombre}</td>
                <td>${plantilla.mensaje}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarPlantillaModal" onclick="cargarDatosEditarPlantilla('${plantilla.id}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPlantilla('${plantilla.id}', '${plantilla.nombre}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para renderizar la tabla de registros
    function renderizarRegistros() {
        const tbody = document.getElementById("registrosTableBody");
        tbody.innerHTML = ""; 

        if (registros.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">No hay datos</td>
                </tr>
            `;
            return;
        }

        registros.forEach(registro => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${registro.nombre}</td>
                <td>${registro.nombrePlantilla}</td>
                <td>${registro.mensaje}</td>
                <td>${registro.curso || "No especificado"}</td>
                <td>${registro.estado || "No especificado"}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarDatosEditarRegistro('${registro.id}')">Editar Etiqueta</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para actualizar las opciones de cursos y estados en los modales
    function actualizarOpciones() {
        const cursoMensaje = document.getElementById("cursoMensaje");
        const estadoEditar = document.getElementById("estadoEditar");
        const cursoCrear = document.getElementById("cursoCrear");
        const estadoCrear = document.getElementById("estadoCrear");

        // Limpiar opciones actuales
        cursoMensaje.innerHTML = "";
        estadoEditar.innerHTML = "";
        cursoCrear.innerHTML = "";
        estadoCrear.innerHTML = "";

        // Agregar nuevas opciones
        cursosDisponibles.forEach(curso => {
            cursoMensaje.innerHTML += `<option value="${curso}">${curso}</option>`;
            cursoCrear.innerHTML += `<option value="${curso}">${curso}</option>`;
        });

        estadosDisponibles.forEach(estado => {
            estadoEditar.innerHTML += `<option value="${estado}">${estado}</option>`;
            estadoCrear.innerHTML += `<option value="${estado}">${estado}</option>`;
        });
    }

    // Lógica para editar un usuario
    window.cargarDatosEditarRegistro = function(id) {
        const registro = registros.find(r => r.id === id);
        if (registro) {
            // Cargar valores actuales en el modal
            document.getElementById("estadoEditar").value = registro.estado;
    
            // Guardar cambios al hacer clic en "Guardar Cambios"
            document.getElementById("guardarCambiosEditarRegistro").onclick = function() {
                registro.estado = `${document.getElementById("estadoEditar").value}`;
                guardarDatos();
                renderizarRegistros();
                bootstrap.Modal.getInstance(document.getElementById('editarModal')).hide();
            };
        }
    };

    // Lógica para eliminar un usuario
    window.eliminarUsuario = function(id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`)) {
            usuarios = usuarios.filter(u => u.id !== id);
            guardarDatos();
            renderizarUsuarios();
        }
    };

    document.getElementById("borrarUsuarios").addEventListener("click", function() {
        if (confirm("¿Estás seguro de que deseas eliminar todos los usuarios?")) {
            usuarios = [];
            guardarDatos();
            renderizarUsuarios();
        }
    });

    // Lógica para crear una nueva etiqueta (curso o estado)
    document.getElementById("guardarCambiosCrear").addEventListener("click", function() {
        const nuevoCurso = document.getElementById("cursoCrear").value;
        const nuevoEstado = document.getElementById("estadoCrear").value;

        if (nuevoCurso && !cursosDisponibles.includes(nuevoCurso)) {
            cursosDisponibles.push(nuevoCurso);
        }

        if (nuevoEstado && !estadosDisponibles.includes(nuevoEstado)) {
            estadosDisponibles.push(nuevoEstado);
        }

        // Actualizar las opciones en los modales
        actualizarOpciones();
        guardarDatos();
        renderizarUsuarios();
    });

    // Lógica para enviar mensaje
    window.cargarDatosEnviarMensaje = function(id) {
        const usuario = usuarios.find(u => u.id === id);
        if (usuario) {
            // Cargar las plantillas en el select del modal
            document.getElementById("plantillaMensaje").innerHTML = plantillas.map(p => `
                <option value="${p.id}">${p.nombre}</option>
            `).join("");
    
            // Cargar los cursos disponibles en el select del modal
            document.getElementById("cursoMensaje").innerHTML = cursosDisponibles.map(curso => `
                <option value="${curso}">${curso}</option>
            `).join("");
    
            // Configurar el botón "Enviar Mensaje"
            document.getElementById("enviarMensaje").onclick = function() {
                const plantillaId = document.getElementById("plantillaMensaje").value;
                const curso = document.getElementById("cursoMensaje").value;
                const numero = usuario.whatsapp;
    
                // Actualizar el curso del usuario
                usuario.curso = curso;
                guardarDatos();
    
                // Verificar que el número esté en formato internacional
                let numeroFormateado = numero.trim();
                if (!numeroFormateado.startsWith("+")) {
                    numeroFormateado = `+51${numeroFormateado}`;
                }

                const plantillaSeleccionada = plantillas.find(p => p.id === plantillaId);
    
                // Codificar el mensaje
                const mensajeCodificado = encodeURIComponent(plantillaSeleccionada?.mensaje ?? "");
    
                // Crear el enlace de WhatsApp
                const enlaceWhatsApp = `https://wa.me/${numeroFormateado}?text=${mensajeCodificado}`;

                //verificar si el usuario ya tiene un registro con ese curso
                const registroExistente = registros.find(r => r.curso === curso && r.usuarioId === usuario.id);

                if (registroExistente) {
                    alert("Ya existe un registro para este usuario con el curso seleccionado");
                    return;
                }

                // Crear Registro
                registros.push({ 
                    id: generateRandomIdentifier("req"), 
                    nombre: `${usuario.nombre} ${usuario.apellido}`,
                    usuarioId: usuario.id,
                    nombrePlantilla: plantillaSeleccionada?.nombre,
                    mensaje: plantillaSeleccionada?.mensaje, 
                    curso, 
                    estado: "Inicio" 
                });

                guardarDatos();
                renderizarRegistros();

                //Redirect to Registro Page
                document.querySelector('[data-section="registros"]').click();

                // Abrir el enlace en una nueva pestaña
                window.open(enlaceWhatsApp, '_blank');

                //close modal
                bootstrap.Modal.getInstance(document.getElementById('enviarMensajeModal')).hide();
            };
        }
    };

    // Lógica para cargar usuarios desde un archivo CSV usando Papa Parse
    document.getElementById("cargarUsuarios").addEventListener("click", function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        input.onchange = function(event) {
            const file = event.target.files[0];
            Papa.parse(file, {
                header: true,
                complete: function(results) {
                    usuarios = results.data.map(usuario => ({
                        id: generateRandomIdentifier("user"),
                        ...usuario,
                        curso: usuario.curso ? `${usuario.curso}` : "No especificado",
                        estado: usuario.estado ? `${usuario.estado}` : "No especificado"
                    }));
                    guardarDatos();
                    renderizarUsuarios();
                }
            });
        };
        input.click();
    });

    window.cargarDatosEditarPlantilla = function (id) {
        const plantilla = plantillas.find(p => p.id === id);
        if (plantilla) {
            document.getElementById("nombrePlantillaEditar").value = plantilla.nombre;
            document.getElementById("mensajePlantillaEditar").value = plantilla.mensaje;

            document.getElementById("guardarCambiosEditarPlantilla").onclick = function () {
                plantilla.nombre = document.getElementById("nombrePlantillaEditar").value;
                plantilla.mensaje = document.getElementById("mensajePlantillaEditar").value;
                guardarDatos();
                renderizarPlantillas();
                bootstrap.Modal.getInstance(document.getElementById('editarPlantillaModal')).hide(); 
            };
        }
    };

    window.eliminarPlantilla = function (id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar la plantilla "${nombre}"?`)) {
            plantillas = plantillas.filter(p => p.id !== id);
            guardarDatos();
            renderizarPlantillas();
        }
    };

    document.getElementById("guardarPlantilla").addEventListener("click", function() {
        const nombre = document.getElementById("nombrePlantilla").value;
        const mensaje = document.getElementById("mensajePlantilla").value;

        if (nombre && mensaje) {
            plantillas.push({ id: generateRandomIdentifier("temp"), nombre, mensaje });
            guardarDatos();
            renderizarPlantillas();
            bootstrap.Modal.getInstance(document.getElementById('crearPlantillaModal')).hide(); 
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Renderizar las tablas al cargar la página
    actualizarOpciones();
    renderizarUsuarios();
    renderizarPlantillas();
    renderizarRegistros();
});