
document.addEventListener("DOMContentLoaded", function() {

    let carrito = [];

    const botonesAgregar = document.querySelectorAll(".add-to-cart");
    const panelCarrito = document.getElementById("carrito");
    const botonCerrar = document.getElementById("cerrar-carrito");
    const listaCarrito = document.getElementById("lista-carrito");
    const precioTotal = document.getElementById("total-precio");
    const botonCheckout = document.getElementById("checkout");

    // Agregar productos
    botonesAgregar.forEach(boton => {

        boton.addEventListener("click", function() {

            const id = this.dataset.id;
            const nombre = this.dataset.name;
            const precio = Number(this.dataset.price);

            agregarAlCarrito(id, nombre, precio);

            panelCarrito.classList.add("abierto");
        });

    });

    // Función para agregar
    function agregarAlCarrito(id, nombre, precio) {

        const existente = carrito.find(item => item.id === id);

        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({
                id,
                nombre,
                precio,
                cantidad: 1
            });
        }

        actualizarCarrito();
    }

    // Actualizar carrito y total
    function actualizarCarrito() {

        listaCarrito.innerHTML = "";

        let total = 0;

        carrito.forEach(item => {

            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            const li = document.createElement("li");

            li.innerHTML = `
                <div class="item-info">
                    <strong>${item.nombre}</strong>
                    <span>Cantidad: ${item.cantidad}</span>
                    <span>$${subtotal.toLocaleString("es-AR")}</span>
                </div>

                <button class="btn-eliminar"
                    data-id="${item.id}">
                    ✕
                </button>
            `;

            listaCarrito.appendChild(li);
        });

        precioTotal.textContent = total.toLocaleString("es-AR");

        // Botones eliminar
        document.querySelectorAll(".btn-eliminar").forEach(boton => {

            boton.addEventListener("click", function() {

                const id = this.dataset.id;

                carrito = carrito.filter(item => item.id !== id);

                actualizarCarrito();
            });

        });
    }

    // Cerrar carrito
    botonCerrar.addEventListener("click", function() {
        panelCarrito.classList.remove("abierto");
    });

    // Finalizar compra (demostración)
    botonCheckout.addEventListener("click", function() {

        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        alert("¡Compra procesada con éxito! Gracias por comprar en PIXER ZONE.");

        carrito = [];
        actualizarCarrito();

        panelCarrito.classList.remove("abierto");
    });

});
