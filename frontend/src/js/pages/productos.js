function ConsultaProductos() {
    fetch('http://localhost:3005/productos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tablaproductos tbody');
            const rows = tableBody.querySelectorAll('tr');

            data.forEach((producto, index) => {


                let row = rows[index];

                if (row) {

                    row.id = `producto-${producto.id_producto}`

                    const cells = row.querySelectorAll('td');

                    cells[0].textContent = producto.nombre;
                    cells[1].textContent = producto.descripcion;
                    cells[2].textContent = `$${parseFloat(producto.precio).toFixed(2)}`;
                    cells[3].textContent = producto.cantidad;


                    const deleteButton = row.querySelector('.btn-eliminar');
                    const editButton = row.querySelector('.btn-editar');

                    if (deleteButton) {

                        deleteButton.addEventListener("click", () => {

                            Swal.fire({
                                title: '¿Estás seguro de eliminar este producto?',
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

                                    eliminarProducto(producto.id_producto);
                                }
                            });

                        });

                    }

                    if (editButton) {
                        editButton.addEventListener("click", () => {
                            sessionStorage.setItem('nombre', producto.nombre);
                            sessionStorage.setItem('descripcion', producto.descripcion);
                            sessionStorage.setItem('precio', producto.precio);
                            sessionStorage.setItem('cantidad', producto.cantidad);
                            sessionStorage.setItem('id_producto', producto.id_producto);

                            sessionStorage.setItem('datosGuardados', 'true');

                            window.location.href = "../../productos/agregar/agregar-productos.html";
                        });
                    }

                } else {
                    const newRow = document.createElement("tr");

                    const cell1 = document.createElement("td");
                    cell1.textContent = producto.nombre;

                    const cell2 = document.createElement("td");
                    cell2.textContent = producto.descripcion;

                    const cell3 = document.createElement("td");
                    cell3.textContent = `$${parseFloat(producto.precio).toFixed(2)}`;

                    const cell4 = document.createElement("td");
                    cell4.textContent = producto.cantidad;

                    const cell6 = document.createElement("td");


                    const editar = document.createElement("button");
                    editar.classList.add("btn-editar");
                    editar.id = "editado";

                    const icono2 = document.createElement("i");
                    icono2.classList.add("bx", "bx-edit");

                    editar.appendChild(icono2);

                    const eliminar = document.createElement("button");
                    eliminar.classList.add("btn-eliminar");
                    eliminar.id = "eliminar-btn";

                    const icono = document.createElement("i");
                    icono.classList.add("bx", "bx-trash");

                    eliminar.appendChild(icono);

                    cell6.appendChild(editar);
                    cell6.appendChild(eliminar);

                    newRow.appendChild(cell1);
                    newRow.appendChild(cell2);
                    newRow.appendChild(cell3);
                    newRow.appendChild(cell4);
                    newRow.appendChild(cell6);

                    newRow.id = `producto-${producto.id_producto}`;

                    tableBody.appendChild(newRow);

                    const deleteButtonn = newRow.querySelector('.btn-eliminar');

                    if (deleteButtonn) {

                        deleteButtonn.addEventListener("click", () => {


                            Swal.fire({
                                title: '¿Estás seguro de eliminar este producto?',
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

                                    eliminarProducto(producto.id_producto);
                                }
                            });
                        });
                    }
                    const editarbuttonn = newRow.querySelector('.btn-editar');

                    if (editarbuttonn) {
                        editarbuttonn.addEventListener("click", () => {
                            sessionStorage.setItem('nombre', producto.nombre);
                            sessionStorage.setItem('descripcion', producto.descripcion);
                            sessionStorage.setItem('precio', producto.precio);
                            sessionStorage.setItem('cantidad', producto.cantidad);
                            sessionStorage.setItem('id_producto', producto.id_producto);

                            sessionStorage.setItem('datosGuardados', 'true');

                            window.location.href = "../../productos/agregar/agregar-productos.html";

                        });
                    }
                }
            })
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

function eliminarProducto(id_producto) {
    fetch(`http://localhost:3005/productos/${id_producto}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                Swal.fire({
                    title: '¡Producto eliminado!',
                    text: 'El producto ha sido eliminado correctamente.',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false,
                });

                const rowToDelete = document.querySelector(`#producto-${id_producto}`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }

            } else {
                alert('Error al eliminar el Producto');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el Producto:', error);
        });
}

window.onload = ConsultaProductos;


document.getElementById("busqueda3").addEventListener("input", () => {
    const searchTerm = document.getElementById("busqueda3").value.toLowerCase();
    const rows = document.querySelectorAll('#tablaproductos tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const nombre = cells[0].textContent.toLowerCase();
        const descripcion = cells[1].textContent.toLowerCase();
        const precio = cells[2].textContent.toLowerCase();
        const cantidad = cells[3].textContent.toLowerCase();


        if (nombre.includes(searchTerm) || descripcion.includes(searchTerm) ||
            precio.includes(searchTerm) || cantidad.includes(searchTerm)) {
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
