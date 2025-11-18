// Variable global para saber si estamos editando
let productoEnEdicion = null;

function ConsultaProductos() {
    fetch('http://localhost:5127/api/Producto')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tablaproductos tbody');
            const rows = tableBody.querySelectorAll('tr');

            // Accede al array de productos dentro de data.productos
            data.productos.forEach((producto, index) => {

                let row = rows[index];

                if (row) {
                    row.id = `producto-${producto.productoId}`;

                    const cells = row.querySelectorAll('td');

                    // Adapta los campos a tu nueva API
                    cells[0].textContent = producto.nombreProducto;
                    cells[1].textContent = producto.codigoProducto;
                    cells[2].textContent = `$${parseFloat(producto.precio).toFixed(2)}`;
                    cells[3].textContent = producto.cantidad;

                    const deleteButton = row.querySelector('.btn-eliminar');
                    const editButton = row.querySelector('.btn-editar');

                    if (deleteButton) {
                        // Limpiar eventos anteriores
                        deleteButton.replaceWith(deleteButton.cloneNode(true));
                        const newDeleteButton = row.querySelector('.btn-eliminar');

                        newDeleteButton.addEventListener("click", () => {
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
                                    eliminarProducto(producto.productoId);
                                }
                            });
                        });
                    }

                    if (editButton) {
                        // Limpiar eventos anteriores
                        editButton.replaceWith(editButton.cloneNode(true));
                        const newEditButton = row.querySelector('.btn-editar');

                        newEditButton.addEventListener("click", (e) => {
                            e.preventDefault();
                            abrirOffcanvasParaEditar(producto);
                        });
                    }

                } else {
                    // Crear nueva fila si no existe
                    const newRow = document.createElement("tr");

                    const cell1 = document.createElement("td");
                    cell1.textContent = producto.nombreProducto;

                    const cell2 = document.createElement("td");
                    cell2.textContent = producto.codigoProducto;

                    const cell3 = document.createElement("td");
                    cell3.textContent = `$${parseFloat(producto.precio).toFixed(2)}`;

                    const cell4 = document.createElement("td");
                    cell4.textContent = producto.cantidad;

                    const cell5 = document.createElement("td");
                    cell5.classList.add("td-operaciones");

                    const btnContainer = document.createElement("div");
                    btnContainer.classList.add("btn-contenedor");

                    const editar = document.createElement("button");
                    editar.classList.add("btn-editar");

                    const icono2 = document.createElement("i");
                    icono2.classList.add("bx", "bx-edit");
                    editar.appendChild(icono2);

                    const eliminar = document.createElement("button");
                    eliminar.classList.add("btn-eliminar");

                    const icono = document.createElement("i");
                    icono.classList.add("bx", "bx-trash");
                    eliminar.appendChild(icono);

                    btnContainer.appendChild(editar);
                    btnContainer.appendChild(eliminar);
                    cell5.appendChild(btnContainer);

                    newRow.appendChild(cell1);
                    newRow.appendChild(cell2);
                    newRow.appendChild(cell3);
                    newRow.appendChild(cell4);
                    newRow.appendChild(cell5);

                    newRow.id = `producto-${producto.productoId}`;

                    tableBody.appendChild(newRow);

                    // Event listeners para la nueva fila
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
                                    eliminarProducto(producto.productoId);
                                }
                            });
                        });
                    }

                    const editarbuttonn = newRow.querySelector('.btn-editar');

                    if (editarbuttonn) {
                        editarbuttonn.addEventListener("click", (e) => {
                            e.preventDefault();
                            abrirOffcanvasParaEditar(producto);
                        });
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

// Función para eliminar producto (SOLO UNA VEZ)
function eliminarProducto(productoId) {
    fetch(`http://localhost:5127/api/Producto/deleteproductos/${productoId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: '¡Producto eliminado!',
                text: data.Mensaje || 'El producto ha sido eliminado correctamente.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false,
            });

            const rowToDelete = document.querySelector(`#producto-${productoId}`);
            if (rowToDelete) {
                rowToDelete.remove();
            }
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar el producto. Por favor, intenta de nuevo.',
                confirmButtonText: 'Aceptar'
            });
        });
}

// Función para abrir el offcanvas y llenar los campos con los datos del producto
function abrirOffcanvasParaEditar(producto) {
    // Guardar el producto que se está editando
    productoEnEdicion = producto;

    // Cambiar el título del offcanvas
    document.getElementById('offcanvasAgregarProductoLabel').textContent = 'Editar Producto';

    // Llenar los campos del formulario con los datos del producto
    document.getElementById('nombre').value = producto.nombreProducto;
    document.getElementById('descripcion').value = producto.codigoProducto;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('cantidad').value = producto.cantidad;

    // Cambiar el texto del botón submit
    const submitBtn = document.querySelector('#formAgregarProducto button[type="submit"]');
    submitBtn.textContent = 'Actualizar';

    // Abrir el offcanvas
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasAgregarProducto'));
    offcanvas.show();
}

// Función para limpiar el formulario cuando se cierra el offcanvas
function limpiarFormulario() {
    productoEnEdicion = null;
    document.getElementById('formAgregarProducto').reset();
    document.getElementById('offcanvasAgregarProductoLabel').textContent = 'Agregar Producto';
    const submitBtn = document.querySelector('#formAgregarProducto button[type="submit"]');
    submitBtn.textContent = 'Agregar';
}

// TODO SE EJECUTA CUANDO EL DOM ESTÁ LISTO
document.addEventListener('DOMContentLoaded', () => {

    // Event listener para el formulario
    document.getElementById('formAgregarProducto').addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const codigoProducto = document.getElementById('descripcion').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);

        if (productoEnEdicion) {
            // ACTUALIZAR PRODUCTO
            try {
                const response = await fetch(`http://localhost:5127/api/Producto/putProductos/${productoEnEdicion.productoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombreProducto: nombre,
                        codigoProducto: codigoProducto,
                        precio: precio,
                        cantidad: cantidad
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Actualizado!',
                        text: data.Mensaje || 'Producto actualizado correctamente',
                        confirmButtonText: 'Aceptar'
                    });

                    // Cerrar offcanvas
                    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasAgregarProducto'));
                    offcanvas.hide();

                    // Recargar la tabla
                    ConsultaProductos();
                    limpiarFormulario();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.Mensaje || 'Error al actualizar el producto',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error de conexión con el servidor',
                    confirmButtonText: 'Aceptar'
                });
            }
        } else {
            // AGREGAR NUEVO PRODUCTO
            try {
                const response = await fetch('http://localhost:5127/api/Producto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombreProducto: nombre,
                        codigoProducto: codigoProducto,
                        precio: precio,
                        cantidad: cantidad
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Producto agregado!',
                        text: data.Mensaje || 'El producto ha sido agregado correctamente.',
                        timer: 2500,
                        showConfirmButton: false
                    });

                    // Cerrar offcanvas
                    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasAgregarProducto'));
                    offcanvas.hide();

                    // Recargar la tabla
                    ConsultaProductos();
                    limpiarFormulario();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.Mensaje || 'Error al agregar el producto',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error de conexión con el servidor',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    });

    // Event listener para limpiar el formulario cuando se cierra el offcanvas
    document.getElementById('offcanvasAgregarProducto').addEventListener('hidden.bs.offcanvas', limpiarFormulario);

    // Cargar productos al iniciar
    ConsultaProductos();
});