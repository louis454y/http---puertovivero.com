// BASE DE DATOS DE PRODUCTOS - PUERTO VIVERO
const inventarioVivero = {
    frutales: {
        titulo: "SECTOR: PLANTAS FRUTALES",
        items: [
            { nombre: 'Mango Tommy', img: 'imagenes/mango-tommy.jpg' },
            { nombre: 'Mango Keitt', img: 'imagenes/mango-keitt.jpg' },
            { nombre: 'Mango Ferchi', img: 'imagenes/mango-ferchi.jpg' },
            { nombre: 'Limón', img: 'imagenes/limon.jpg' },
            { nombre: 'Mandarina', img: 'imagenes/mandarina.jpg' },
            { nombre: 'Naranja', img: 'imagenes/naranja.jpg' },
            { nombre: 'Toronja', img: 'imagenes/toronja.jpg' },
            { nombre: 'Guayaba Pera', img: 'imagenes/guayaba.jpg' },
            { nombre: 'Zapote', img: 'imagenes/zapote.jpg' },
            { nombre: 'Níspero', img: 'imagenes/nispero.jpg' },
            { nombre: 'Caimito', img: 'imagenes/caimito.jpg' },
            { nombre: 'Guanábana', img: 'imagenes/guanabana.jpg' },
            { nombre: 'Coco', img: 'imagenes/coco.jpg' },
            { nombre: 'Aguacate', img: 'imagenes/aguacate.jpg' },
            { nombre: 'Papaya', img: 'imagenes/papaya.jpg' },
            { nombre: 'Uva (Parra)', img: 'imagenes/uva.jpg' },
            { nombre: 'Durazno', img: 'imagenes/durazno.jpg' },
            { nombre: 'Fresa', img: 'imagenes/fresa.jpg' }
        ]
    },
    ornamentales: {
        titulo: "SECTOR: PLANTAS ORNAMENTALES",
        items: [
            { nombre: 'Palma Manila', img: 'imagenes/palma-manila.jpg' },
            { nombre: 'Palma Areca', img: 'imagenes/palma-areca.jpg' },
            { nombre: 'Palma Cola de Zorro', img: 'imagenes/palma-zorro.jpg' },
            { nombre: 'Palma Botella', img: 'imagenes/palma-botella.jpg' },
            { nombre: 'Bambú', img: 'imagenes/bambu.jpg' },
            { nombre: 'Veranera (Buganvilla)', img: 'imagenes/veranera.jpg' },
            { nombre: 'Trinitaria', img: 'imagenes/trinitaria.jpg' },
            { nombre: 'Croto', img: 'imagenes/croto.jpg' },
            { nombre: 'Ixora', img: 'imagenes/ixora.jpg' },
            { nombre: 'Cayena', img: 'imagenes/cayena.jpg' }
        ]
    }
};

let carrito = [];
let audioDesbloqueado = false;

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL LOADER E INICIO ---
    const btnExplorar = document.getElementById("btn-explorar");
    if (btnExplorar) {
        btnExplorar.addEventListener("click", function() {
            const mensaje = document.getElementById("loader-mensaje");
            const progreso = document.getElementById("loader-progreso");
            const percentageText = document.getElementById("load-percentage");
            const barFill = document.getElementById("bar-fill");
            const loader = document.getElementById("loader-wrapper");
            const musica = document.getElementById("musica-fondo");
            const leaf1 = document.querySelector(".leaf-1");
            const leaf2 = document.querySelector(".leaf-2");
            const leaf3 = document.querySelector(".leaf-3");

            

            if (musica) {
                musica.volume = 0.2; 
                musica.play().catch(e => console.log("Audio habilitado"));
            }

            this.style.display = "none";
            if (progreso) progreso.style.display = "block";
            if (mensaje) mensaje.innerText = "INICIALIZANDO PROTOCOLO BIÓTICO...";

            let count = 0;
            const startLoading = setInterval(() => {
                count++;
                if (percentageText) percentageText.innerText = count + "%";
                if (barFill) barFill.style.width = count + "%";
                
                if(count > 20 && leaf1) {
                    leaf1.style.opacity = "1";
                    leaf1.style.width = "40px";
                    leaf1.style.height = "40px";
                }
                
              if(count > 80 && leaf3) {
    leaf3.style.opacity = "1";
    leaf3.style.width = "45px";
    leaf3.style.height = "45px";
}
                if (count >= 100) {
                    clearInterval(startLoading);
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                        loader.style.opacity = "0";
                        loader.style.visibility = "hidden";
                        audioDesbloqueado = true; 

                        // --- ACTIVAR CARRITO AQUÍ ---
                        const btnCarrito = document.querySelector('.cart-btn-flotante');
                        if (btnCarrito) {
                            btnCarrito.classList.add('visible');
                        }
                    }, 500);
                }
            }, 30);
        });
    }
    

    // --- LÓGICA DE MENÚ MÓVIL ---
    const btnHamburguesa = document.querySelector('.menu-toggle');
    const menuNavegacion = document.getElementById('nav-menu');
    const enlacesMenu = document.querySelectorAll('#nav-menu li a');

    if (btnHamburguesa && menuNavegacion) {
        btnHamburguesa.addEventListener('click', () => {
            menuNavegacion.classList.toggle('active');
            btnHamburguesa.classList.toggle('open');
        });

        enlacesMenu.forEach(enlace => {
            enlace.addEventListener('click', () => {
                menuNavegacion.classList.remove('active');
                btnHamburguesa.classList.remove('open');
            });
        });
    }

    aplicarSonidos();
});

// --- FUNCIONES DE INVENTARIO Y VENTANAS ---
function abrirVentana(categoria) {
    const modal = document.getElementById('ventana-productos');
    const titulo = document.getElementById('titulo-categoria');
    const lista = document.getElementById('lista-items');

    if (!inventarioVivero[categoria]) return;

    titulo.innerText = inventarioVivero[categoria].titulo;
    lista.innerHTML = ""; 

    inventarioVivero[categoria].items.forEach((planta, index) => {
        const divItem = document.createElement('div');
        divItem.className = 'planta-link-cotizador';
        const inputID = `cant-${categoria}-${index}`;

        divItem.innerHTML = `
            <div class="visual-hologram">
                <img src="${planta.img}" alt="${planta.nombre}" onerror="this.src='https://via.placeholder.com/150?text=BIO-DATA'">
            </div>
            <div class="info-planta">
                <span class="code-text">> SCAN_NAME:</span> <strong>${planta.nombre}</strong>
            </div>
            <div class="controles-cotizacion">
                <div class="campo">
                    <label>Cant:</label>
                    <input type="number" id="${inputID}" class="input-futurista cant" value="1" min="1">
                </div>
                <div class="campo">
                    <label>Altura:</label>
                    <select class="input-futurista alt">
                        <option value="50 cm">50 cm</option>
                        <option value="80 cm">80 cm</option>
                        <option value="1m">1m</option>
                        <option value="1.5m">1.5m</option>
                        <option value="2m">2m</option>
                    </select>
                </div>
                <button class="btn-cotizar-item" onclick="agregarAlCarrito('${planta.nombre}', '${inputID}', this)">AÑADIR AL PEDIDO</button>
            </div>
        `;
        lista.appendChild(divItem);
    });

    aplicarSonidos();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function agregarAlCarrito(nombre, idInput, boton) {
    const inputElement = document.getElementById(idInput);
    const cantidad = parseInt(inputElement.value);
    const altura = boton.parentElement.querySelector('.alt').value;

    if (isNaN(cantidad) || cantidad < 1) return;

    const existe = carrito.find(item => item.nombre === nombre && item.altura === altura);
    if (existe) {
        existe.cantidad += cantidad;
    } else {
        carrito.push({ nombre, cantidad, altura });
    }

    actualizarCarritoUI();
    
    const btnFlotante = document.querySelector('.cart-btn-flotante');
    if (btnFlotante) {
        btnFlotante.style.boxShadow = "0 0 40px #1fec1f";
        setTimeout(() => btnFlotante.style.boxShadow = "0 0 15px rgba(31, 236, 31, 0.3)", 300);
    }

    const textoOriginal = boton.innerText;
    boton.innerText = "¡AÑADIDO!";
    boton.style.background = "#fff";
    setTimeout(() => {
        boton.innerText = textoOriginal;
        boton.style.background = "#1fec1f";
    }, 1000);
}

function actualizarCarritoUI() {
    const lista = document.getElementById('cart-items-list');
    const count = document.getElementById('cart-count');
    if (!lista || !count) return;

    lista.innerHTML = '';
    let totalItems = 0;

    carrito.forEach((item, index) => {
        totalItems += item.cantidad;
        lista.innerHTML += `
            <div class="item-carrito">
                <span>> ${item.nombre} (${item.altura}) x${item.cantidad}</span>
                <span onclick="eliminarDelCarrito(${index})" style="color: #ff4444; cursor: pointer; font-family: monospace;"> [X]</span>
            </div>
        `;
    });
    count.innerText = totalItems;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoUI();
}

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('active');
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) return alert("El protocolo de pedido está vacío.");
    const nombreCliente = document.getElementById('final-nombre').value.trim();
    const ciudadCliente = document.getElementById('final-ciudad').value.trim();

    if (!nombreCliente || !ciudadCliente) {
        alert("Por favor, ingresa tu NOMBRE y UBICACIÓN para procesar la cotización.");
        return;
    }

    let mensaje = `*SOLICITUD DE COTIZACIÓN - PUERTO VIVERO*%0A%0A`;
    mensaje += `*Cliente:* ${nombreCliente}%0A`;
    mensaje += `*Ubicación:* ${ciudadCliente}%0A%0A`;
    mensaje += `*PEDIDO:*%0A`;

    carrito.forEach(item => {
        mensaje += `- ${item.nombre} (${item.altura}): ${item.cantidad} unidades%0A`;
    });
    mensaje += `%0AHola Luis, me interesa este listado. ¿Me confirmas disponibilidad y precios?`;

    window.open(`https://wa.me/573025465134?text=${mensaje}`, '_blank');
}

function cerrarVentana() {
    const modal = document.getElementById('ventana-productos');
    if(modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(e) {
    if (e.target.className === 'modal-overlay') cerrarVentana();
}

// --- EFECTOS DE SONIDO Y RAYOS ---
function dispararRayo() {
    const rayo = document.querySelector('.rayo-energia');
    if(rayo) {
        rayo.classList.add('animar-rayo');
        setTimeout(() => rayo.classList.remove('animar-rayo'), 1500);
    }
    setTimeout(dispararRayo, 6000); 
}
setTimeout(dispararRayo, 3000);

function ejecutarSonido() {
    const hoverSound = document.getElementById('hover-audio');
    if (audioDesbloqueado && hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.1;
        hoverSound.play().catch(e => {});
    }
}

function aplicarSonidos() {
    const targets = document.querySelectorAll(
        '#nav-menu a, .logo, .btn-neon, .module-card, .logo-item, .video-card, .cart-btn-nav, .btn-cotizar-item'
    );
    targets.forEach(target => {
        target.removeEventListener('mouseenter', ejecutarSonido);
        target.addEventListener('mouseenter', ejecutarSonido);
    });
}

// --- FORMULARIO DE CONTACTO ---
const formProtocolo = document.getElementById('form-protocolo');
if(formProtocolo) {
    formProtocolo.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const nombre = document.getElementById('nombre-contacto').value;
        const email = document.getElementById('email-contacto').value;
        const mensaje = document.getElementById('mensaje-contacto').value;

        let textoWA = `*NUEVO CONTACTO - SISTEMA BIÓTICO*%0A%0A`;
        textoWA += `*Nombre:* ${nombre}%0A`;
        textoWA += `*Email:* ${email}%0A`;
        textoWA += `*Mensaje:* ${mensaje}`;

        window.open(`https://wa.me/573025465134?text=${textoWA}`, '_blank');
    });
}


/**
 * PROTOCOLO DE AUDIO AVANZADO CON FADE
 * Suaviza la salida y reinicia el ambiente biótico al volver.
 */
document.addEventListener("visibilitychange", () => {
    const musica = document.getElementById("musica-fondo");
    if (!musica || !audioDesbloqueado) return;

    if (document.hidden) {
        // EFECTO FADE OUT: Baja el volumen gradualmente antes de pausar
        let fadeOut = setInterval(() => {
            if (musica.volume > 0.05) {
                musica.volume -= 0.05;
            } else {
                clearInterval(fadeOut);
                musica.pause();
                musica.currentTime = 0; // Reinicia para la próxima vuelta
            }
        }, 50); // Velocidad del desvanecimiento
    } else {
        // EFECTO FADE IN: Sube el volumen gradualmente al regresar
        musica.volume = 0;
        musica.play().catch(e => console.log("Reactivación bloqueada"));
        
        let fadeIn = setInterval(() => {
            if (musica.volume < 0.15) { // Tu volumen objetivo de 0.2 aprox
                musica.volume += 0.02;
            } else {
                clearInterval(fadeIn);
            }
        }, 100);
    }
});





