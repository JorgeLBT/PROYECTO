let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1, imagen });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`${nombre} agregado al carrito`);
}

// Actualiza el contador del carrito en la interfaz
function actualizarContadorCarrito() {
    const cartCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('cart-count').innerText = `(${cartCount})`;
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío.</td></tr>';
        document.getElementById('total').innerText = 'Total: $0 pesos';
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        carritoDiv.innerHTML += `
            <tr>
                <td><img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px;"></td>
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>
                    <button onclick="modificarCantidad(${index}, -1)">-</button>
                    ${item.cantidad}
                    <button onclick="modificarCantidad(${index}, 1)">+</button>
                </td>
                <td>$${subtotal}</td>
                <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    document.getElementById('total').innerText = `Total: $${total} pesos`;
}

// Función para modificar la cantidad de productos
function modificarCantidad(index, cambio) {
    if (cambio === 1) {
        carrito[index].cantidad++;
    } else if (cambio === -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            // Si la cantidad es 1 y se quiere reducir, se elimina el producto
            eliminarProducto(index);
            return;
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Llama a mostrarCarrito al cargar la página
window.onload = mostrarCarrito;
