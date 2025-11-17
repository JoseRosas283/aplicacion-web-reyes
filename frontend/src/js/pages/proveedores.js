function ConsultaProveedores() {
    fetch('http://localhost:3005/proveedores')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tablaproveedores tbody');
            const rows = tableBody.querySelectorAll('tr');


            data.forEach((proveedor, index) => {


                let row = rows[index];

                if (row) {

                    row.id = `proveedor-${proveedor.id_proveedor}`

                    const cells = row.querySelectorAll('td');

                    cells[0].textContent = proveedor.nombre;
                    cells[1].textContent = proveedor.apellido_paterno;
                    cells[2].textContent = proveedor.apellido_materno;
                    cells[3].textContent = proveedor.telefono;
                    cells[4].textContent = proveedor.rfc;


                    const deleteButton = row.querySelector('.btn-eliminar');
                    const editButton = row.querySelector('.btn-editar');

                    if (deleteButton) {

                        deleteButton.addEventListener("click", () => {

                            Swal.fire({
                                title: '¿Estás seguro de eliminar este proveedor?',
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

                                    eliminarProveedor(proveedor.id_proveedor);
                                }
                            });

                        });

                    }
                    if (editButton) {
                        editButton.addEventListener("click", () => {
                            sessionStorage.setItem('nombre', proveedor.nombre);
                            sessionStorage.setItem('apellido_paterno', proveedor.apellido_paterno);
                            sessionStorage.setItem('apellido_materno', proveedor.apellido_materno);
                            sessionStorage.setItem('telefono', proveedor.telefono);
                            sessionStorage.setItem('rfc', proveedor.rfc);
                            sessionStorage.setItem('id_proveedor', proveedor.id_proveedor);

                            sessionStorage.setItem('datosGuardados', 'true');

                            window.location.href = "/Prototipo_navegacional_Web/proveedores/agregar/agregar-proveedores.html";
                        });
                    }

                } else {
                    const newRow = document.createElement("tr");

                    const cell1 = document.createElement("td");
                    cell1.textContent = proveedor.nombre;

                    const cell2 = document.createElement("td");
                    cell2.textContent = proveedor.apellido_paterno;

                    const cell3 = document.createElement("td");
                    cell3.textContent = proveedor.apellido_materno;

                    const cell4 = document.createElement("td");
                    cell4.textContent = proveedor.telefono;

                    const cell5 = document.createElement("td");
                    cell5.textContent = proveedor.rfc;

                    const cell6 = document.createElement("td");


                    const editar = document.createElement("button");
                    editar.classList.add("btn-editar");
                    editar.id = ("editado3");

                    const icono2 = document.createElement("i");
                    icono2.classList.add("bx", "bx-edit");

                    editar.appendChild(icono2);

                    const eliminar = document.createElement("button");
                    eliminar.classList.add("btn-eliminar");
                    eliminar.id = ("eliminar3");

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

                    newRow.id = `proveedor-${proveedor.id_proveedor}`;

                    tableBody.appendChild(newRow);

                    const deleteButtonn = newRow.querySelector('.btn-eliminar');

                    if (deleteButtonn) {

                        deleteButtonn.addEventListener("click", () => {
                            Swal.fire({
                                title: '¿Estás seguro de eliminar este proveedor?',
                                text: '¡No podrás revertir esta acción!',
                                showCancelButton: true,
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar',
                                reverseButtons: true,
                                customClass: {
                                    confirmButton: 'btn-confirm',
                                    cancelButton: 'btn-cancel'
                                }

                            }).then((result) => {
                                if (result.isConfirmed) {

                                    eliminarProveedor(proveedor.id_proveedor);
                                }
                            });

                        });

                    }
                    const editarbuttonn = newRow.querySelector('.btn-editar');

                    if (editarbuttonn) {
                        editarbuttonn.addEventListener("click", () => {
                            sessionStorage.setItem('nombre', proveedor.nombre);
                            sessionStorage.setItem('apellido_paterno', proveedor.apellido_paterno);
                            sessionStorage.setItem('apellido_materno', proveedor.apellido_materno);
                            sessionStorage.setItem('telefono', proveedor.telefono);
                            sessionStorage.setItem('rfc', proveedor.rfc);
                            sessionStorage.setItem('id_proveedor', proveedor.id_proveedor);

                            sessionStorage.setItem('datosGuardados', 'true');

                            window.location.href = "../../proveedores/agregar/agregar-proveedores.html";

                        });
                    }
                }
            })
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
        });
}
function eliminarProveedor(id_proveedor) {
    fetch(`http://localhost:3005/proveedor/${id_proveedor}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {

                Swal.fire({
                    title: '¡Proveedor Eliminado!',
                    text: 'El proveedor ha sido eliminado correctamente.',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false,
                });

                const rowToDelete = document.querySelector(`#proveedor-${id_proveedor}`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }

            } else {
                alert('Error al eliminar el Proveedor');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el Proveedor:', error);
        });
}

window.onload = ConsultaProveedores;

document.getElementById("busqueda").addEventListener("input", () => {
    const searchTerm = document.getElementById("busqueda").value.toLowerCase();
    const rows = document.querySelectorAll('#tablaproveedores tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const nombre = cells[0].textContent.toLowerCase();
        const apellidoPaterno = cells[1].textContent.toLowerCase();
        const apellidoMaterno = cells[2].textContent.toLowerCase();
        const telefono = cells[3].textContent.toLowerCase();
        const rfc = cells[4].textContent.toLowerCase();

        if (nombre.includes(searchTerm) || apellidoPaterno.includes(searchTerm) ||
            apellidoMaterno.includes(searchTerm) || telefono.includes(searchTerm) || rfc.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

});



/* ---------------------------------------------FUNCION PARA QUE EL USUARIO BUSQUE-------------------------------------- */
function searchTable(query) {
    const tbody = document.querySelector(".tabla_valor_total_de_inventario tbody");

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

// Evento de búsqueda
document.getElementById('searchInput').addEventListener('input', () => {
    const query = document.getElementById('searchInput').value.trim();
    searchTable(query);
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