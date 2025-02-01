document.addEventListener('DOMContentLoaded', function() {
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

    // Datos de ejemplo para la tabla de usuarios
    let usuarios = [
        {
            nombre: "Frabousco",
            apellido: "Gonzales",
            numero: "987654322",
            correo: "fgonzales@gmail.com",
            curso: "Curso: básico",
            estado: "Estado: Terminado"
        }
    ];

    // Listas de cursos y estados disponibles
    let cursosDisponibles = ["HTML", "CSS", "JavaScript", "Java"];
    let estadosDisponibles = ["En espera", "En progreso", "Terminado"];

    // Datos de ejemplo para la tabla de plantillas
    let plantillas = [
        { nombre: "Bienvenida", mensaje: "Hola, gracias por contactarnos" },
        { nombre: "Recordatorio", mensaje: "No olvides asistir a la reunión de mañana." },
        { nombre: "Despedida", mensaje: "Te agradecemos tu compromiso con nosotros" }
    ];

    // Datos de ejemplo para la tabla de registros
    let registros = [
        { nombre: "Frabousco", nombrePlantilla: "Bienvenida", mensaje: "¡Hola! gracias por contactarnos" },
        { nombre: "Frabousco", nombrePlantilla: "Recordatorio", mensaje: "No olvides asistir a la reunión de mañana." },
        { nombre: "Frabousco", nombrePlantilla: "Despedida", mensaje: "Te agradecemos tu compromiso con nosotros" }
    ];

    // Función para renderizar la tabla de usuarios
    function renderizarUsuarios() {
        const tbody = document.querySelector("#usuarios tbody");
        tbody.innerHTML = ""; // Limpiar la tabla antes de renderizar
        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.numero}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.curso}</td>
                <td>${usuario.estado}</td>
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
        tbody.innerHTML = ""; // Limpiar la tabla antes de renderizar
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
        tbody.innerHTML = ""; // Limpiar la tabla antes de renderizar
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
            document.getElementById("cursoEditar").value = usuario.curso.split(": ")[1];
            document.getElementById("estadoEditar").value = usuario.estado.split(": ")[1];
            document.getElementById("guardarCambiosEditar").onclick = function() {
                usuario.curso = `Curso: ${document.getElementById("cursoEditar").value}`;
                usuario.estado = `Estado: ${document.getElementById("estadoEditar").value}`;
                renderizarUsuarios();
            };
        }
    };

    // Lógica para eliminar un usuario
    window.eliminarUsuario = function(nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`)) {
            usuarios = usuarios.filter(u => u.nombre !== nombre);
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
        renderizarUsuarios();
    });

    // Lógica para enviar mensaje
    window.cargarDatosEnviarMensaje = function(nombre) {
        const usuario = usuarios.find(u => u.nombre === nombre);
        if (usuario) {
            document.getElementById("plantillaMensaje").innerHTML = plantillas.map(p => `
                <option value="${p.mensaje}">${p.nombre}</option>
            `).join("");
            document.getElementById("enviarMensaje").onclick = function() {
                const plantilla = document.getElementById("plantillaMensaje").value;
                const numero = usuario.numero;
                const mensaje = encodeURIComponent(plantilla);
                window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
            };
        }
    };

    // Renderizar las tablas al cargar la página
    actualizarOpciones();
    renderizarUsuarios();
    renderizarPlantillas();
    renderizarRegistros();
});