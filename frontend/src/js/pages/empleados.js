function ConsultaEmpleados() {
    fetch('http://localhost:3005/empleados')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tablaEmpleados tbody');
            const rows = tableBody.querySelectorAll('tr');


            data.forEach((empleado, index) => {


                let row = rows[index];

                if (row) {

                    row.id = `empleado-${empleado.id_empleado}`

                    const cells = row.querySelectorAll('td');

                    cells[0].textContent = empleado.nombre;
                    cells[1].textContent = empleado.apellido_paterno;
                    cells[2].textContent = empleado.apellido_materno;
                    cells[3].textContent = empleado.telefono;
                    cells[4].textContent = empleado.curp;


                    const deleteButton = row.querySelector('.btn-eliminar');
                    const editButton = row.querySelector('.btn-editar');

                    if (deleteButton) {

                        deleteButton.addEventListener("click", () => {


                            Swal.fire({
                                title: '¿Estás seguro de eliminar este empleado?',
                                text: '¡No podrás revertir esta acción!',
                                showCancelButton: true,
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar',
                                reverseButtons: true,
                                customClass: {
                                    title: "title",
                                    confirmButton: 'btn-confirm',
                                    cancelButton: 'btn-cancel'
                                },
                                allowOutsideClick: false,
                                allowEscapeKey: false,

                            }).then((result) => {
                                if (result.isConfirmed) {

                                    eliminarEmpleado(empleado.id_empleado);
                                }
                            });
                        });

                    }

                    if (editButton) {
                        editButton.addEventListener("click", () => {
                            sessionStorage.setItem('nombre', empleado.nombre);
                            sessionStorage.setItem('apellido_paterno', empleado.apellido_paterno);
                            sessionStorage.setItem('apellido_materno', empleado.apellido_materno);
                            sessionStorage.setItem('telefono', empleado.telefono);
                            sessionStorage.setItem('curp', empleado.curp);
                            sessionStorage.setItem('id_empleado', empleado.id_empleado);

                            sessionStorage.setItem('datosGuardados', 'true');

                            window.location.href = '/Prototipo_navegacional_Web/empleados/agregar/agregar-empleados.html';
                        });
                    }

                } else {
                    const newRow = document.createElement("tr");

                    const cell1 = document.createElement("td");
                    cell1.textContent = empleado.nombre;

                    const cell2 = document.createElement("td");
                    cell2.textContent = empleado.apellido_paterno;

                    const cell3 = document.createElement("td");
                    cell3.textContent = empleado.apellido_materno;

                    const cell4 = document.createElement("td");
                    cell4.textContent = empleado.telefono;

                    const cell5 = document.createElement("td");
                    cell5.textContent = empleado.curp;

                    const cell6 = document.createElement("td");


                    const editar = document.createElement("button");
                    editar.classList.add("btn-editar");
                    editar.id = ("editado2")

                    const icono2 = document.createElement("i");
                    icono2.classList.add("bx", "bx-edit");

                    editar.appendChild(icono2);

                    const eliminar = document.createElement("button");
                    eliminar.classList.add("btn-eliminar");
                    eliminar.id = ("eliminar2")

                    const icono = document.createElement("i");
                    icono.classList.add("bx", "bx-trash");

                    eliminar.appendChild(icono);

                    cell6.appendChild(editar);
                    cell6.appendChild(eliminar);

                    newRow.appendChild(cell1);
                    newRow.appendChild(cell2);
                    newRow.appendChild(cell3);
                    newRow.appendChild(cell4);
                    newRow.appendChild(cell5);
                    newRow.appendChild(cell6);

                    newRow.id = `empleado-${empleado.id_empleado}`;

                    tableBody.appendChild(newRow);

                    const deleteButtonn = newRow.querySelector('.btn-eliminar');

                    if (deleteButtonn) {

                        deleteButtonn.addEventListener("click", () => {


                            Swal.fire({
                                title: '¿Estás seguro de eliminar este empleado?',
                                text: '¡No podrás revertir esta acción!',
                                showCancelButton: true,
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar',
                                reverseButtons: true,
                                customClass: {
                                    title: "title",
                                    confirmButton: 'btn-confirm',
                                    cancelButton: 'btn-cancel'
                                },
                                allowOutsideClick: false,
                                allowEscapeKey: false,

                            }).then((result) => {
                                if (result.isConfirmed) {

                                    eliminarEmpleado(empleado.id_empleado);
                                }
                            });
                        });

                    }

                    const editarbuttonn = newRow.querySelector('.btn-editar');

                    if (editarbuttonn) {
                        editarbuttonn.addEventListener("click", () => {
                            sessionStorage.setItem('nombre', empleado.nombre);
                            sessionStorage.setItem('apellido_paterno', empleado.apellido_paterno);
                            sessionStorage.setItem('apellido_materno', empleado.apellido_materno);
                            sessionStorage.setItem('telefono', empleado.telefono);
                            sessionStorage.setItem('curp', empleado.curp);
                            sessionStorage.setItem('id_empleado', empleado.id_empleado);

                            sessionStorage.setItem('datosGuardados', 'true');

                            window.location.href = "../../empleados/agregar/agregar-empleados.html";
                        });
                    }
                }
            })
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
        });
}

function eliminarEmpleado(id_empleado) {
    fetch(`http://localhost:3005/empleado/${id_empleado}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {

                Swal.fire({
                    title: '¡Empleado  eliminado!',
                    text: 'El empleado ha sido eliminado correctamente.',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false,
                });

                const rowToDelete = document.querySelector(`#empleado-${id_empleado}`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }

            } else {
                alert('Error al eliminar el empleado');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el empleado:', error);
        });
}

window.onload = ConsultaEmpleados;


document.getElementById("busqueda2").addEventListener("input", () => {
    const searchTerm = document.getElementById("busqueda2").value.toLowerCase();
    const rows = document.querySelectorAll('#tablaEmpleados tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const nombre = cells[0].textContent.toLowerCase();
        const apellidoPaterno = cells[1].textContent.toLowerCase();
        const apellidoMaterno = cells[2].textContent.toLowerCase();
        const telefono = cells[3].textContent.toLowerCase();
        const curp = cells[4].textContent.toLowerCase();

        if (nombre.includes(searchTerm) || apellidoPaterno.includes(searchTerm) ||
            apellidoMaterno.includes(searchTerm) || telefono.includes(searchTerm) || curp.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

});






/* -----------------------------------------------FUNCION DE BUSCAR ------------------------------------------------------ */
function searchTable(query) {
    const tbody = document.querySelector(".tabla_entradas_y_salidas tbody");

    if (!tbody) return; /* SI NO ENCUENTRA EL BODY REGRESA */

    const rows = tbody.getElementsByTagName('tr');
    const queryLower = query.toLowerCase(); /* SE CONVIERTE LO QUE ESTA ESCRIBIENDO EL USUARIO A MINUSCULAS PARA QUE LA BUSQUEDA SEA INSENSIBLE */
    let resultsFound = false;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let shouldDisplay = false;/* SE DECLARA UNA VARIABLE PARA VER SI SE MUESTRA O NO */

        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent || cells[j].innerText;/* LE PUSE DOS OPCIONES POR SI UNOS NAVEGADORAS NO ACEPTAN UN METODO */
            if (cellText.toLowerCase().includes(queryLower)) {/* SE COMPARAN LOS TEXTOS */
                shouldDisplay = true;
                break;
            } else {
                /* NO HAGAS NADA */
            }
        }

        rows[i].style.display = shouldDisplay ? '' : 'none';

        // Si al menos una fila es visible, hay resultados
        if (shouldDisplay) {
            resultsFound = true;
        } else {
            /* NO HAGAS NADA */
        }
    }

    // ELIMINAR EL MENSAJE DE NO RESULTADOS PARA MOSTRAR REGISTROS
    const existingNoResultsRow = document.getElementById('noResults');
    if (existingNoResultsRow) {
        existingNoResultsRow.remove();
    } else {
        /* NO HAGAS NADA */
    }

    // Si no hay resultados y hay un query, mostrar mensaje
    if (!resultsFound && query.trim() !== '') {
        const noResults = document.createElement('tr');
        noResults.id = 'noResults';/* ES NESEARIO EL ID PARA BORRAR EL MENSAJE */
        noResults.innerHTML = `<td colspan="5" style="color:red; text-align:center;">No se encontraron resultados</td>`;
        tbody.appendChild(noResults);
    } else {
        /* NO HAGAS NADA */
    }
}
// EVENTO DE BUSQUEDA
document.getElementById('searchInput').addEventListener('input', () => {
    const query = document.getElementById('searchInput').value.trim();
    searchTable(query);
});

/* ---------------------------------------CARGAR LOS DATOS POR DEFECTO----------------------- */
document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos(producto); // Mostrar todos los productos al cargar

});

/* --------------------------------------- ABRIR Y CERRAR EL MENU DE OPCIONES DE OPCIONES Y NOTIFICACIONES ---------------------- */
const dropdown = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdown2 = document.querySelector(".dropdown-toggle2");
const dropdownMenu2 = document.querySelector(".dropdown-menu2");

dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");

    /* SI EL SEGUNDO MENU ESTA ABIERTO */
    if (dropdownMenu2.classList.contains("show")) {
        /* CIERRALO */
        dropdownMenu2.classList.remove("show");
    }

});

dropdown2.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu2.classList.toggle("show");
    /* SI EL PRIMER MENU ESTA ABIERTO */
    if (dropdownMenu.classList.contains("show")) {
        /* CIERRALO */
        dropdownMenu.classList.remove("show");
    }
});

document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
    dropdownMenu2.classList.remove("show");
}) 