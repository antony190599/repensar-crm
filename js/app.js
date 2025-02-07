document.addEventListener('DOMContentLoaded', function() {

    const dataStorage = new DataStore();

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


    // Función para renderizar la tabla de usuarios
    function renderizarUsuarios() {
        const tbody = document.querySelector("#usuarios tbody");
        tbody.innerHTML = ""; 

        const usuarios = dataStorage.getUsers();
    
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
                <td>
                    <div>
                        <b>${usuario.nombre} ${usuario.apellido}</b>
                        <div>${usuario.correo}</div>
                    </div>
                </td>
                <td>${usuario.whatsapp}</td>
                <td>
                    <!-- Botones de acción
                    <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#crearModal">Crear Etiqueta</button>
                    -->
                    <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#enviarMensajeModal" onclick="cargarDatosEnviarMensaje('${usuario.id}')">Enviar Mensaje</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.id}', '${usuario.nombre}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para renderizar la tabla de plantillas
    function renderizarPlantillas() {
        const tbody = document.querySelector("#plantillasTable tbody");
        tbody.innerHTML = ""; 

        const plantillas = dataStorage.getTemplates();

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

    function renderizarCursos() {
        const tbody = document.querySelector("#cursosTable tbody");
        tbody.innerHTML = ""; 

        const cursos = dataStorage.getCourses();

        if (cursos.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="2" class="text-center">No hay datos</td>
                </tr>
            `;
            return;
        }

        cursos.forEach(curso => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${curso.name}</td>
                <td class="text-end">
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarCursoModal" onclick="cargarDatosEditarCurso('${curso.id}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCurso('${curso.id}', '${curso.name}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderizarEstados() {
        const tbody = document.querySelector("#estadosTable tbody");
        tbody.innerHTML = ""; 

        const estados = dataStorage.getStatuses();

        if (estados.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="2" class="text-center">No hay datos</td>
                </tr>
            `;
            return;
        }

        estados.forEach(estado => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${estado.name}</td>
                <td class="text-end">
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarEstadoModal" onclick="cargarDatosEditarEstado('${estado.id}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarEstado('${estado.id}', '${estado.name}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }


    // Función para renderizar la tabla de registros
    function renderizarRegistros() {
        const tbody = document.getElementById("registrosTableBody");
        tbody.innerHTML = ""; 

        const registros = dataStorage.getRecords();

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
                <td>${registro.nombre_completo}</td>
                <td>${registro.nombrePlantilla}</td>
                <td>${registro.mensaje}</td>
                <td>${registro.cursoName || "No especificado"}</td>
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
        const cursoEditar = document.getElementById("cursoEditar");

        // Limpiar opciones actuales
        cursoMensaje.innerHTML = "";
        estadoEditar.innerHTML = "";
        cursoCrear.innerHTML = "";
        estadoCrear.innerHTML = "";
        cursoEditar.innerHTML = "";

        const cursosDisponibles = dataStorage.getCoursesWithEmptyOption();

        const estadosDisponibles = dataStorage.getStatuses();

        // Agregar nuevas opciones
        cursosDisponibles.forEach(curso => {
            cursoMensaje.innerHTML += `<option value="${curso.id}">${curso.name}</option>`;
            cursoCrear.innerHTML += `<option value="${curso.id}">${curso.name}</option>`;
            cursoEditar.innerHTML += `<option value="${curso.id}">${curso.name}</option>`;
        });

        estadosDisponibles.forEach(estado => {
            estadoEditar.innerHTML += `<option value="${estado.id}">${estado.name}</option>`;
            estadoCrear.innerHTML += `<option value="${estado.id}">${estado.name}</option>`;
        });
    }

    // Lógica para editar un usuario
    window.cargarDatosEditarRegistro = function(id) {
        const registro = dataStorage.getRecord(id);
        if (registro) {
            // Cargar valores actuales en el modal
            document.getElementById("estadoEditar").value = registro.estadoId;
            document.getElementById("cursoEditar").value = registro.cursoId;
    
            // Guardar cambios al hacer clic en "Guardar Cambios"
            document.getElementById("guardarCambiosEditarRegistro").onclick = function() {
                const cursoId = document.getElementById("cursoEditar").value;
                const estadoId = document.getElementById("estadoEditar").value
                dataStorage.editRecord(id, { 
                    estadoId: estadoId,
                    estado: dataStorage.getStatus(estadoId)?.name,
                    cursoName: dataStorage.getCourse(cursoId)?.name,
                    cursoId: cursoId,
                    updatedAt: new Date().toISOString()
                });
                renderizarRegistros();
                bootstrap.Modal.getInstance(document.getElementById('editarModal')).hide();
            };
        }
    };

    // Lógica para eliminar un usuario
    window.eliminarUsuario = function(id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`)) {
            dataStorage.removeUser(id);
            renderizarUsuarios();
        }
    };

    document.getElementById("borrarUsuarios").addEventListener("click", function() {
        if (confirm("¿Estás seguro de que deseas eliminar todos los usuarios?")) {
            dataStorage.clearUsers();
            renderizarUsuarios();
        }
    });

    document.getElementById("borrarRegistros").addEventListener("click", function() {
        if (confirm("¿Estás seguro de que deseas eliminar todos los registros?")) {
            dataStorage.data.records = [];
            dataStorage.saveToStorage();
            renderizarRegistros();
        }
    });

    // Lógica para crear una nueva etiqueta (curso o estado)
    document.getElementById("guardarCambiosCrear").addEventListener("click", function() {
        const nuevoCurso = document.getElementById("cursoCrear").value;
        const nuevoEstado = document.getElementById("estadoCrear").value;

        if (nuevoCurso && !dataStorage.getCourse(nuevoCurso)) {
            dataStorage.addCourse({ name: nuevoCurso });
        }

        if (nuevoEstado && !dataStorage.getStatus(nuevoEstado)) {
            dataStorage.addStatus(nuevoEstado);
        }

        // Actualizar las opciones en los modales
        actualizarOpciones();
        renderizarUsuarios();
        renderizarCursos();
        renderizarEstados();

        bootstrap.Modal.getInstance(document.getElementById('crearModal')).hide();
    });

    document.getElementById("enviarMensajeModal").addEventListener("show.bs.modal", function() {

        document.getElementById("plantillaMensaje").value = "";
        document.getElementById("mensajePersonalizado").value = "";
        document.getElementById("mensajePersonalizado").disabled = false;
        document.getElementById("cursoMensaje").value = "";
    });

    // Lógica para enviar mensaje
    window.cargarDatosEnviarMensaje = function(id) {
        const usuario = dataStorage.getUser(id);
        if (usuario) {
            // Cargar las plantillas en el select del modal
            const plantillas = dataStorage.getTemplatesWithEmptyOption();
            const cursosDisponibles = dataStorage.getCoursesWithEmptyOption();

            document.getElementById("plantillaMensaje").innerHTML = plantillas.map(p => `
                <option value="${p.id}">${p.nombre}</option>
            `).join("");
    
            // Cargar los cursos disponibles en el select del modal
            document.getElementById("cursoMensaje").innerHTML = cursosDisponibles.map(curso => `
                <option value="${curso.id}">${curso.name}</option>
            `).join("");
    
            // Configurar el botón "Enviar Mensaje"
            document.getElementById("enviarMensaje").onclick = function() {
                const plantillaId = document.getElementById("plantillaMensaje").value;
                const cursoId = document.getElementById("cursoMensaje").value;
                const numero = usuario.whatsapp;
    
                // Actualizar el curso del usuario
                dataStorage.editUser(id, { curso: cursoId });

                const plantillaSeleccionada = dataStorage.getTemplate(plantillaId);
                const mensajePersonalizado = document.getElementById("mensajePersonalizado").value;

                // Crear el enlace de WhatsApp
                const mensaje = plantillaSeleccionada?.mensaje ?? mensajePersonalizado;
                const enlaceWhatsApp = createWhatsAppLink(numero, mensaje);

                // Verificar si no seleccionaste una plantilla y no escribiste un mensaje personalizado
                if (!plantillaId && !mensajePersonalizado) {
                    alert("Por favor, selecciona una plantilla o escribe un mensaje personalizado.");
                    return;
                }

                // Verificar si el usuario ya tiene un registro con ese curso y tipo de mensaje
                const registros = dataStorage.getRecords();
                const registroExistente = registros.find(r => r.cursoId === cursoId && r.usuarioId === usuario.id && r.nombrePlantilla === plantillaSeleccionada?.nombre);

                if (registroExistente) {
                    if (!confirm("Ya existe un registro para este usuario con el curso seleccionado y el mismo tipo de mensaje. ¿Deseas enviar el mensaje de todas formas?")) {
                        return;
                    }
                }

                dataStorage.addRecord({
                    nombre_completo: `${usuario.nombre} ${usuario.apellido}`,
                    telefono: usuario.whatsapp,
                    correo: usuario.correo,
                    usuarioId: usuario.id,
                    nombrePlantilla: plantillaSeleccionada?.nombre ?? "Personalizado",
                    isMessagePredefined: plantillaId ? true : false,
                    mensaje: mensaje, 
                    cursoName: dataStorage.getCourse(cursoId)?.name,
                    cursoId: cursoId,
                    estadoId: dataStorage.getStatusByName("Inicio")?.id,
                    estado: "Inicio",
                    createdAt: new Date().toISOString()
                });

                renderizarRegistros();

                // Redirect to Registro Page
                document.querySelector('[data-section="registros"]').click();

                // Abrir el enlace en una nueva pestaña
                window.open(enlaceWhatsApp, '_blank');

                // Close modal
                bootstrap.Modal.getInstance(document.getElementById('enviarMensajeModal')).hide();
            };
        }
    };

    // Listen event when select change to disable textarea to send message
    document.getElementById("plantillaMensaje").addEventListener("change", function() {
        console.log("change");
        const plantillaId = document.getElementById("plantillaMensaje").value;

        if (plantillaId != "") {
            document.getElementById("mensajePersonalizado").disabled = true;
        } else {
            document.getElementById("mensajePersonalizado").disabled = false;
        }
        
    });

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
                    results.data.forEach(usuario => {
                        dataStorage.upsertUserByEmail(usuario.correo, {
                            ...usuario,
                            curso: usuario.curso ? `${usuario.curso}` : "No especificado",
                            estado: usuario.estado ? `${usuario.estado}` : "No especificado"
                        });
                    });
                    renderizarUsuarios();
                }
            });
        };
        input.click();
    });

    window.cargarDatosEditarPlantilla = function (id) {
        const plantilla = dataStorage.getTemplate(id);
        if (plantilla) {
            document.getElementById("nombrePlantillaEditar").value = plantilla.nombre;
            document.getElementById("mensajePlantillaEditar").value = plantilla.mensaje;

            document.getElementById("guardarCambiosEditarPlantilla").onclick = function () {

                dataStorage.editTemplate(id, {
                    nombre: document.getElementById("nombrePlantillaEditar").value,
                    mensaje: document.getElementById("mensajePlantillaEditar").value
                });

                renderizarPlantillas();
                bootstrap.Modal.getInstance(document.getElementById('editarPlantillaModal')).hide(); 
            };
        }
    };

    window.eliminarPlantilla = function (id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar la plantilla "${nombre}"?`)) {

            dataStorage.removeTemplate(id);
            renderizarPlantillas();
        }
    };

    document.getElementById("guardarPlantilla").addEventListener("click", function() {
        const nombre = document.getElementById("nombrePlantilla").value;
        const mensaje = document.getElementById("mensajePlantilla").value;

        if (nombre && mensaje) {
            dataStorage.addTemplate({ nombre, mensaje });

            renderizarPlantillas();
            bootstrap.Modal.getInstance(document.getElementById('crearPlantillaModal')).hide(); 
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    document.getElementById("crearCursoModal").addEventListener("show.bs.modal", function() {
        document.getElementById("nombreCurso").value = "";
    });

    document.getElementById("crearEstadoModal").addEventListener("show.bs.modal", function() {
        document.getElementById("nombreEstado").value = "";
    });

    document.getElementById("guardarCurso").addEventListener("click", function() {
        const nombre = document.getElementById("nombreCurso").value;

        if (nombre) {
            //validar nombre
            const cursoExistente = dataStorage.getCourseByName(nombre);

            if (cursoExistente) {
                alert("Ya existe un curso con ese nombre");
                return;
            }


            dataStorage.addCourse({ name: nombre });

            renderizarCursos();
            bootstrap.Modal.getInstance(document.getElementById('crearCursoModal')).hide(); 
        } else {
            alert("Por favor, completa todos los campos.");
        }

    });

    document.getElementById("guardarEstado").addEventListener("click", function() {
        const nombre = document.getElementById("nombreEstado").value;

        if (nombre) {

            //validar nombre
            const estadoExistente = dataStorage.getStatusByName(nombre);

            if (estadoExistente) {
                alert("Ya existe un estado con ese nombre");
                return;
            }

            dataStorage.addStatus({ name: nombre});

            renderizarEstados();
            bootstrap.Modal.getInstance(document.getElementById('crearEstadoModal')).hide(); 
        } else {
            alert("Por favor, completa todos los campos.");
        }

    });

    window.cargarDatosEditarCurso = function(id) {
        const curso = dataStorage.getCourse(id);
        if (curso) {
            document.getElementById("nombreCursoEditar").value = curso.name;

            document.getElementById("guardarCambiosEditarCurso").onclick = function() {
                dataStorage.editCourse(id, {
                    name: document.getElementById("nombreCursoEditar").value
                });

                renderizarCursos();
                bootstrap.Modal.getInstance(document.getElementById('editarCursoModal')).hide();
            };
        }
    };

    window.eliminarCurso = function(id, name) {
        if (confirm(`¿Estás seguro de que deseas eliminar el curso "${name}"?`)) {
            dataStorage.removeCourse(id);
            renderizarCursos();
        }
    };

    window.cargarDatosEditarEstado = function(id) {
        const estado = dataStorage.getStatus(id);
        if (estado) {
            document.getElementById("nombreEstadoEditar").value = estado.name;

            document.getElementById("guardarCambiosEditarEstado").onclick = function() {
                dataStorage.editStatus(id, {
                    name: document.getElementById("nombreEstadoEditar").value
                });

                renderizarEstados();
                bootstrap.Modal.getInstance(document.getElementById('editarEstadoModal')).hide();
            };
        }
    };

    window.eliminarEstado = function(id, name) {
        if (confirm(`¿Estás seguro de que deseas eliminar el estado "${name}"?`)) {
            dataStorage.removeStatus(id);
            renderizarEstados();
        }
    };

    let ttrChart, messageUsageChart, conversionRateChart, responseRateChart;

    function inicializarGraficos() {
        // Datos de ejemplo (puedes reemplazarlos con datos reales desde tu backend)
        const ttrData = {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Tiempo de Respuesta Promedio (minutos)',
                data: [7, 5, 6, 4, 8, 6, 5], // Ejemplo de datos
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    
        const messageUsageData = {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Tasa de Uso de Mensajes Predeterminados (%)',
                data: [85, 90, 88, 92], // Ejemplo de datos
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };
    
        const conversionRateData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
            datasets: [{
                label: 'Tasa de Conversión de Leads (%)',
                data: [15, 20, 18, 25, 22], // Ejemplo de datos
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        };
    
        const responseRateData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
            datasets: [{
                label: 'Tasa de Respuesta de Leads (%)',
                data: [60, 65, 70, 68, 75], // Ejemplo de datos
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        };
    
        // Configuración común para los gráficos
        const commonOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Período'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Estadísticas'
                }
            }
        };
    
        // Inicializar gráficos
        ttrChart = new Chart(document.getElementById('ttrChart'), {
            type: 'line',
            data: ttrData,
            options: commonOptions
        });
    
        messageUsageChart = new Chart(document.getElementById('messageUsageChart'), {
            type: 'bar',
            data: messageUsageData,
            options: commonOptions
        });
    
        conversionRateChart = new Chart(document.getElementById('conversionRateChart'), {
            type: 'line',
            data: conversionRateData,
            options: commonOptions
        });
    
        responseRateChart = new Chart(document.getElementById('responseRateChart'), {
            type: 'bar',
            data: responseRateData,
            options: commonOptions
        });
    }

    function actualizarGraficos() {
        // Obtener datos desde localStorage o una API
        const ttrDataActualizado = [6, 4, 5, 3, 7, 5, 4]; // Ejemplo de datos actualizados
        const messageUsageDataActualizado = [88, 92, 90, 94]; // Ejemplo de datos actualizados
        const conversionRateDataActualizado = [18, 22, 20, 25, 23]; // Ejemplo de datos actualizados
        const responseRateDataActualizado = [65, 70, 68, 72, 75]; // Ejemplo de datos actualizados
    
        // Actualizar los gráficos
        ttrChart.data.datasets[0].data = ttrDataActualizado;
        ttrChart.update();
    
        messageUsageChart.data.datasets[0].data = messageUsageDataActualizado;
        messageUsageChart.update();
    
        conversionRateChart.data.datasets[0].data = conversionRateDataActualizado;
        conversionRateChart.update();
    
        responseRateChart.data.datasets[0].data = responseRateDataActualizado;
        responseRateChart.update();
    }

    // Dark Mode

    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const body = document.body;

    // Verificar si el usuario ya tiene una preferencia guardada
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Aplicar el modo oscuro si está activado
    if (isDarkMode) {
        body.classList.add('dark-mode');
        toggleDarkModeButton.innerHTML = '<i class="bi bi-sun"></i> Modo Claro';
    }

    // Cambiar entre modo claro y oscuro
    toggleDarkModeButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');

        // Guardar la preferencia del usuario en localStorage
        localStorage.setItem('darkMode', isDarkMode);

        // Cambiar el ícono y el texto del botón
        if (isDarkMode) {
            toggleDarkModeButton.innerHTML = '<i class="bi bi-sun"></i> Modo Claro';
        } else {
            toggleDarkModeButton.innerHTML = '<i class="bi bi-moon"></i> Modo Oscuro';
        }
    });

    
    // Llamar a la función para actualizar los gráficos cada cierto tiempo
    setInterval(actualizarGraficos, 5000); // Actualiza cada 5 segundos

    // Renderizar las tablas al cargar la página
    actualizarOpciones();
    renderizarUsuarios();
    renderizarPlantillas();
    renderizarRegistros();
    renderizarCursos();
    renderizarEstados();
    // Inicializar gráficos del dashboard
    inicializarGraficos();
});

