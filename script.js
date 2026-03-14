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

/**
 * Función principal para desplegar la ventana de inventario
 */
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

    // IMPORTANTE: Aplicar sonidos a los nuevos elementos generados
    aplicarSonidos();

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Sistema de Carrito
 */
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

    const url = `https://wa.me/573025465134?text=${mensaje}`;
    window.open(url, '_blank');
}

function cerrarVentana() {
    const modal = document.getElementById('ventana-productos');
    if(modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Animación de Rayo de Energía
if (!document.querySelector('.rayo-energia')) {
    const rayoDiv = document.createElement('div');
    rayoDiv.className = 'rayo-energia';
    document.body.appendChild(rayoDiv);
}

function dispararRayo() {
    const rayo = document.querySelector('.rayo-energia');
    if(rayo) {
        rayo.classList.add('animar-rayo');
        setTimeout(() => rayo.classList.remove('animar-rayo'), 1500);
    }
    setTimeout(dispararRayo, 6000); 
}
setTimeout(dispararRayo, 3000);

window.onclick = function(e) {
    if (e.target.className === 'modal-overlay') cerrarVentana();
}

/* GESTIÓN DE NAVEGACIÓN */
document.addEventListener('DOMContentLoaded', () => {
    const btnHamburguesa = document.querySelector('.menu-toggle');
    const menuNavegacion = document.querySelector('nav ul');

    if (btnHamburguesa && menuNavegacion) {
        btnHamburguesa.addEventListener('click', () => {
            menuNavegacion.classList.toggle('active');
            btnHamburguesa.classList.toggle('open');
        });

        const enlaces = menuNavegacion.querySelectorAll('a');
        enlaces.forEach(link => {
            link.addEventListener('click', () => {
                menuNavegacion.classList.remove('active');
                btnHamburguesa.classList.remove('open');
            });
        });
    }
});

// Forzar inicio arriba
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

/* EFECTOS AMBIENTALES */
function crearPolen() {
    const polen = document.createElement('div');
    polen.style.position = 'fixed';
    polen.style.width = '2px';
    polen.style.height = '2px';
    polen.style.background = '#1fec1f';
    polen.style.left = Math.random() * 100 + 'vw';
    polen.style.top = '110vh';
    polen.style.opacity = Math.random();
    polen.style.borderRadius = '50%';
    polen.style.zIndex = '-1';
    polen.style.boxShadow = '0 0 5px #1fec1f';
    document.body.appendChild(polen);

    const animacion = polen.animate([
        { transform: 'translateY(0)', opacity: polen.style.opacity },
        { transform: 'translateY(-110vh)', opacity: 0 }
    ], {
        duration: Math.random() * 5000 + 5000,
        easing: 'linear'
    });

    animacion.onfinish = () => polen.remove();
}
setInterval(crearPolen, 300);

function crearParticulaOxigeno() {
    const particula = document.createElement('div');
    particula.style.position = 'fixed';
    particula.style.width = Math.random() * 3 + 'px';
    particula.style.height = particula.style.width;
    particula.style.background = '#1fec1f';
    particula.style.left = Math.random() * 100 + 'vw';
    particula.style.top = '110vh';
    particula.style.opacity = Math.random() * 0.5;
    particula.style.borderRadius = '50%';
    particula.style.zIndex = '-1';
    particula.style.pointerEvents = 'none';
    particula.style.boxShadow = '0 0 8px #1fec1f';
    
    document.body.appendChild(particula);

    const duracion = Math.random() * 8000 + 4000;
    const animacion = particula.animate([
        { transform: 'translateY(0) translateX(0)', opacity: particula.style.opacity },
        { transform: `translateY(-120vh) translateX(${(Math.random() - 0.5) * 100}px)`, opacity: 0 }
    ], {
        duration: duracion,
        easing: 'ease-out'
    });

    animacion.onfinish = () => particula.remove();
}
setInterval(crearParticulaOxigeno, 400);

/**
 /**
 * PROTOCOLO DE AUDIO - DESBLOQUEO Y EJECUCIÓN
 */
const hoverSound = document.getElementById('hover-audio');
let audioDesbloqueado = false;

function desbloquearAudio() {
    if (!audioDesbloqueado && hoverSound) {
        // Intentar reproducir y pausar inmediatamente para ganar permiso del navegador
        hoverSound.play().then(() => {
            hoverSound.pause();
            hoverSound.currentTime = 0;
            audioDesbloqueado = true;
            console.log("Sistema de audio operativo.");
        }).catch(err => console.log("Esperando interacción para activar audio..."));
    }
}

// Desbloquear con el primer clic en el documento
document.addEventListener('click', desbloquearAudio, { once: true });

function ejecutarSonido() {
    if (audioDesbloqueado && hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.2; // Subí un poco el volumen para que lo notes
        hoverSound.play().catch(e => console.log("Error al reproducir:", e));
    }
}

function aplicarSonidos() {
    // Seleccionamos todos los elementos que deben sonar
    const targets = document.querySelectorAll('#nav-menu a, .logo, .btn-neon, .module-card, .logo-item, .btn-cotizar-item');

    targets.forEach(target => {
        // Limpiamos eventos previos para evitar sonidos dobles
        target.removeEventListener('mouseenter', ejecutarSonido);
        target.addEventListener('mouseenter', ejecutarSonido);
    });
}

// Única llamada oficial al cargar el documento
document.addEventListener('DOMContentLoaded', aplicarSonidos);
function aplicarSonidos() {
    // Seleccionamos todos los enlaces del menú y elementos interactivos
    const targets = document.querySelectorAll('#nav-menu a, .logo, .btn-neon, .module-card, .logo-item');

    targets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            ejecutarSonido(); // Esta es la función que ya tienes definida
        });
    });
}

// IMPORTANTE: Llama a la función cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    aplicarSonidos();
});

// Esto fuerza a que todos los enlaces y tarjetas escuchen el mouse
document.addEventListener('DOMContentLoaded', () => {
    if (typeof aplicarSonidos === 'function') {
        aplicarSonidos();
    }
});
