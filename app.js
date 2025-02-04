document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos desde localStorage o inicializar si no existen
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
        {
            nombre: "Frabousco",
            apellido: "Gonzales",
            whatsapp: "987654322",
            correo: "fgonzales@gmail.com",
            curso: "Curso: básico",
            estado: "Estado: Terminado"
        }
    ];

    let plantillas = JSON.parse(localStorage.getItem('plantillas')) || [
        { nombre: "Bienvenida", mensaje: "Hola, gracias por contactarnos" },
        { nombre: "Recordatorio", mensaje: "No olvides asistir a la reunión de mañana." },
        { nombre: "Despedida", mensaje: "Te agradecemos tu compromiso con nosotros" }
    ];

    let registros = JSON.parse(localStorage.getItem('registros')) || [
        { nombre: "Frabousco", nombrePlantilla: "Bienvenida", mensaje: "¡Hola! gracias por contactarnos" },
        { nombre: "Frabousco", nombrePlantilla: "Recordatorio", mensaje: "No olvides asistir a la reunión de mañana." },
        { nombre: "Frabousco", nombrePlantilla: "Despedida", mensaje: "Te agradecemos tu compromiso con nosotros" }
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
        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.whatsapp}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.curso || "Curso: No especificado"}</td>
                <td>${usuario.estado || "Estado: No especificado"}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarDatosEditar('${usuario.nombre}')">Editar Etiqueta</button>
                    <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#crearModal">Crear Etiqueta</button>
                    <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#enviarMensajeModal" onclick="cargarDatosEnviarMensaje('${usuario.nombre}')">Enviar Mensaje</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.nombre}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para renderizar la tabla de plantillas
    function renderizarPlantillas() {
        const tbody = document.querySelector("#plantillas tbody");
        tbody.innerHTML = ""; 
        plantillas.forEach(plantilla => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${plantilla.nombre}</td>
                <td>${plantilla.mensaje}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarPlantillaModal" onclick="cargarDatosEditarPlantilla('${plantilla.nombre}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPlantilla('${plantilla.nombre}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para renderizar la tabla de registros
    function renderizarRegistros() {
        const tbody = document.getElementById("registrosTableBody");
        tbody.innerHTML = ""; 
        registros.forEach(registro => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${registro.nombre}</td>
                <td>${registro.nombrePlantilla}</td>
                <td>${registro.mensaje}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para actualizar las opciones de cursos y estados en los modales
    function actualizarOpciones() {
        const cursoEditar = document.getElementById("cursoEditar");
        const estadoEditar = document.getElementById("estadoEditar");
        const cursoCrear = document.getElementById("cursoCrear");
        const estadoCrear = document.getElementById("estadoCrear");

        // Limpiar opciones actuales
        cursoEditar.innerHTML = "";
        estadoEditar.innerHTML = "";
        cursoCrear.innerHTML = "";
        estadoCrear.innerHTML = "";

        // Agregar nuevas opciones
        cursosDisponibles.forEach(curso => {
            cursoEditar.innerHTML += `<option value="${curso}">${curso}</option>`;
            cursoCrear.innerHTML += `<option value="${curso}">${curso}</option>`;
        });

        estadosDisponibles.forEach(estado => {
            estadoEditar.innerHTML += `<option value="${estado}">${estado}</option>`;
            estadoCrear.innerHTML += `<option value="${estado}">${estado}</option>`;
        });
    }

    // Lógica para editar un usuario
    window.cargarDatosEditar = function(nombre) {
        const usuario = usuarios.find(u => u.nombre === nombre);
        if (usuario) {
            // Cargar valores actuales en el modal
            document.getElementById("cursoEditar").value = usuario.curso.split(": ")[1];
            document.getElementById("estadoEditar").value = usuario.estado.split(": ")[1];

            // Guardar cambios al hacer clic en "Guardar Cambios"
            document.getElementById("guardarCambiosEditar").onclick = function() {
                usuario.curso = `Curso: ${document.getElementById("cursoEditar").value}`;
                usuario.estado = `Estado: ${document.getElementById("estadoEditar").value}`;
                guardarDatos();
                renderizarUsuarios(); 
                bootstrap.Modal.getInstance(document.getElementById('editarModal')).hide(); 
            };
        }
    };

    // Lógica para eliminar un usuario
    window.eliminarUsuario = function(nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`)) {
            usuarios = usuarios.filter(u => u.nombre !== nombre);
            guardarDatos();
            renderizarUsuarios();
        }
    };

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
    window.cargarDatosEnviarMensaje = function(nombre) {
        const usuario = usuarios.find(u => u.nombre === nombre);
        if (usuario) {
            // Cargar las plantillas en el select del modal
            document.getElementById("plantillaMensaje").innerHTML = plantillas.map(p => `
                <option value="${p.mensaje}">${p.nombre}</option>
            `).join("");

            // Configurar el botón "Enviar Mensaje"
            document.getElementById("enviarMensaje").onclick = function() {
                const plantilla = document.getElementById("plantillaMensaje").value;
                const numero = usuario.whatsapp; 

                // Verificar que el número esté en formato internacional
                let numeroFormateado = numero.trim(); 
                if (!numeroFormateado.startsWith("+")) {
                    numeroFormateado = `+51${numeroFormateado}`;
                }

                // Codificar el mensaje
                const mensajeCodificado = encodeURIComponent(plantilla);

                // Crear el enlace de WhatsApp
                const enlaceWhatsApp = `https://wa.me/${numeroFormateado}?text=${mensajeCodificado}`;

                // Abrir el enlace en una nueva pestaña
                window.open(enlaceWhatsApp, '_blank');
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
                        ...usuario,
                        curso: usuario.curso ? `Curso: ${usuario.curso}` : "Curso: No especificado",
                        estado: usuario.estado ? `Estado: ${usuario.estado}` : "Estado: No especificado"
                    }));
                    guardarDatos();
                    renderizarUsuarios();
                }
            });
        };
        input.click();
    });

    window.cargarDatosEditarPlantilla = function (nombre) {
        const plantilla = plantillas.find(p => p.nombre === nombre);
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

    window.eliminarPlantilla = function (nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar la plantilla "${nombre}"?`)) {
            plantillas = plantillas.filter(p => p.nombre !== nombre);
            guardarDatos();
            renderizarPlantillas();
        }
    };

    document.getElementById("guardarPlantilla").addEventListener("click", function() {
        const nombre = document.getElementById("nombrePlantilla").value;
        const mensaje = document.getElementById("mensajePlantilla").value;

        if (nombre && mensaje) {
            plantillas.push({ nombre, mensaje });
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