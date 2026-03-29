// --- 1. BASE DE DATOS DE PRODUCTOS ---
const mp = new MercadoPago('APP_USR-ee3b8bb0-c550-4343-87fc-fe6db5f9d64b', {
    locale: 'es-CO'
});

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
            { nombre: 'Papaya', img: 'imagenes/papaya.jpg' }
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
            { nombre: 'Cayena', img: 'imagenes/cayena.jpg' }
        ]
    }
};

// --- 2. TARIFAS Y PRECIOS ---
const TARIFAS_ENVIO = {
    "Puerto Colombia": 30000,
    "Barranquilla": 50000,
    "Soledad": 50000,
    "Galapa": 60000,
    "Sabanagrande": 60000,
    "Malambo": 60000,
    "Baranoa": 70000,
    "Polonuevo": 70000,
    "Colón / Colón Nuevo": 70000,
    "Sabanalarga": 80000,
    "Juan de Acosta": 80000,
    "Piojó": 80000,
    "Cartagena": 140000,
    "Santa Marta": 160000,
    "Turbaco": 150000,
    "Arjona": 150000,
    "Santa Rosa de Bolívar": 180000,
    "OTRA CIUDAD": 0
};

const PRECIOS_FRUTALES = {
    "1m":   { 50: 32000, 100: 30000, 150: 28000, 200: 27000 },
    "1.5m": { 50: 35000, 100: 32000, 150: 29000, 200: 28000 },
    "2m":   { 50: 38000, 100: 34200, 150: 31200, 200: 30000 }
};

let carrito = [];
let audioDesbloqueado = false;

// --- 3. INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const btnExplorar = document.getElementById("btn-explorar");
    if (btnExplorar) {
        btnExplorar.addEventListener("click", iniciarCargaBiotica);
    }
    configurarMenuMovil();
});

function iniciarCargaBiotica() {
    const loader = document.getElementById("loader-wrapper");
    const msg = document.getElementById("loader-mensaje");
    const musica = document.getElementById("musica-fondo");
    
    if (musica) { musica.volume = 0.2; musica.play().catch(() => {}); }
    
    document.getElementById("btn-explorar").style.display = "none";
    document.getElementById("loader-progreso").style.display = "block";
    msg.innerText = "SINCRONIZANDO ADN VEGETAL...";

    let count = 0;
    const interval = setInterval(() => {
        count++;
        document.getElementById("load-percentage").innerText = count + "%";
        document.getElementById("bar-fill").style.width = count + "%";
        if (count >= 100) {
            clearInterval(interval);
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                audioDesbloqueado = true;
                document.querySelector('.cart-btn-flotante').classList.add('visible');
            }, 500);
        }
    }, 25);
}

// --- 4. FUNCIONES DEL CARRITO ---
function abrirVentana(categoria) {
    const modal = document.getElementById('ventana-productos');
    const lista = document.getElementById('lista-items');
    document.getElementById('titulo-categoria').innerText = inventarioVivero[categoria].titulo;
    lista.innerHTML = ""; 

    inventarioVivero[categoria].items.forEach((planta) => {
        const esFrutal = categoria === 'frutales';
        const div = document.createElement('div');
        div.className = 'planta-link-cotizador';
        div.innerHTML = `
            <div class="visual-hologram"><img src="${planta.img}" alt="${planta.nombre}"></div>
            <div class="info-planta"><strong>${planta.nombre}</strong></div>
            <div class="controles-cotizacion">
                <div class="campo"><label>Cant:</label>
                    ${esFrutal ? `<select class="input-futurista cant"><option value="50">50</option><option value="100">100</option><option value="150">150</option><option value="200">200</option></select>` 
                    : `<input type="number" class="input-futurista cant" value="1" min="1">`}
                </div>
                <div class="campo"><label>Altura:</label>
                    <select class="input-futurista alt">
                        <option value="1m">1.0 m</option><option value="1.5m">1.5 m</option><option value="2m">2.0 m</option>
                    </select>
                </div>
                <button class="btn-cotizar-item" onclick="agregarAlCarrito('${planta.nombre}', this, '${categoria}')">AÑADIR AL PEDIDO</button>
            </div>`;
        lista.appendChild(div);
    });
    modal.style.display = 'flex';
}

function agregarAlCarrito(nombre, boton, tipo) {
    const container = boton.parentElement;
    const cant = parseInt(container.querySelector('.cant').value);
    const alt = container.querySelector('.alt').value;

    const existente = carrito.find(i => i.nombre === nombre && i.altura === alt);
    if (existente) {
        existente.cantidad = tipo === 'frutales' ? cant : existente.cantidad + cant;
    } else {
        carrito.push({ nombre, cantidad: cant, altura: alt, tipo });
    }
    
    actualizarCarritoUI();
    boton.innerText = "¡SISTEMA ACTUALIZADO!";
    setTimeout(() => boton.innerText = "AÑADIR AL PEDIDO", 1000);
}

function actualizarCarritoUI() {
    const lista = document.getElementById('cart-items-list');
    lista.innerHTML = '';
    let subtotal = 0;

    carrito.forEach((item, index) => {
        let precioTxt = "Por Cotizar";
        if (item.tipo === 'frutales') {
            const pUnit = PRECIOS_FRUTALES[item.altura][item.cantidad];
            const pTotal = pUnit * item.cantidad;
            subtotal += pTotal;
            precioTxt = `$${pTotal.toLocaleString()}`;
        }
        lista.innerHTML += `
            <div class="item-carrito" style="border-bottom: 1px solid rgba(31,236,31,0.2); padding: 8px 0;">
                <div style="font-size:0.75rem;">> ${item.nombre} (${item.altura}) x${item.cantidad}</div>
                <div style="display:flex; justify-content:space-between; color:#1fec1f; font-weight:bold;">
                    <span>${precioTxt}</span>
                    <span onclick="eliminarItem(${index})" style="color:red; cursor:pointer;">[X]</span>
                </div>
            </div>`;
    });

    document.getElementById('cart-count').innerText = carrito.length;
    generarCheckout(subtotal);
}

// --- 5. LÓGICA DE CHECKOUT Y ENVÍO ---
function generarCheckout(subtotal) {
    const container = document.getElementById('datos-pedido-final');
    
    // Si el carrito está vacío, limpiar y mostrar mensaje
    if (carrito.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 20px; color: rgba(31,236,31,0.5); font-size:0.8rem;">
                [ SISTEMA VACÍO - ESPERANDO DATOS ]
            </div>`;
        return;
    }

    // Si hay productos, mostrar el formulario y el ÚNICO botón de Mercado Pago
    container.innerHTML = `
        <div style="margin-top:10px; border-top:1px solid #1fec1f; padding-top:10px;">
            <p style="font-size:0.7rem; color:#1fec1f; margin-bottom:10px;">DATOS DE DESPACHO:</p>
            <input type="text" id="chk-nombre" placeholder="NOMBRE COMPLETO" class="input-futurista" style="width:100%; margin-bottom:5px;">
            <input type="text" id="chk-tel" placeholder="TELÉFONO" class="input-futurista" style="width:100%; margin-bottom:5px;">
            <input type="text" id="chk-cedula" placeholder="CÉDULA" class="input-futurista" style="width:100%; margin-bottom:5px;">
            
            <select id="chk-ciudad" class="input-futurista" style="width:100%; margin-bottom:5px;" onchange="actualizarTotalFinal(${subtotal})">
                <option value="">SELECCIONAR DESTINO</option>
                ${Object.keys(TARIFAS_ENVIO).map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
            
            <input type="text" id="chk-dir" placeholder="DIRECCIÓN" class="input-futurista" style="width:100%; margin-bottom:5px;">
            
            <div id="msg-otra-ciudad" style="color:#ffaa00; font-size:0.65rem; margin:5px 0; display:none;">
                "Nuestro equipo verificará el valor del transporte para su ubicación."
            </div>

            <div id="resumen-final" style="margin-top:12px; background:rgba(31,236,31,0.1); padding:8px; border: 1px solid rgba(31,236,31,0.3);">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem;"><span>SUBTOTAL:</span> <span>$${subtotal.toLocaleString()}</span></div>
                <div style="display:flex; justify-content:space-between; font-size:0.8rem;"><span>ENVÍO:</span> <span id="envio-val">$0</span></div>
                <div style="display:flex; justify-content:space-between; color:#1fec1f; font-weight:bold; font-size:1rem; border-top:1px solid #1fec1f; margin-top:5px; padding-top:5px;">
                    <span>TOTAL:</span> <span id="total-val">$${subtotal.toLocaleString()}</span>
                </div>
            </div>

            <button class="btn-cotizar-todo" onclick="pagarConMercadoPago(${subtotal})" style="background:#009ee3; color:#fff; width:100%; margin-top:15px; border:none; height:50px; font-weight:bold; cursor:pointer; text-transform: uppercase;">
                PAGAR CON MERCADO PAGO
            </button>
        </div>
    `;
}

function actualizarTotalFinal(subtotal) {
    const ciudad = document.getElementById('chk-ciudad').value;
    const envio = TARIFAS_ENVIO[ciudad] || 0;
    document.getElementById('msg-otra-ciudad').style.display = (ciudad === "OTRA CIUDAD") ? "block" : "none";
    document.getElementById('envio-val').innerText = `$${envio.toLocaleString()}`;
    document.getElementById('total-val').innerText = `$${(subtotal + envio).toLocaleString()}`;
}

async function pagarConMercadoPago(subtotal) {
    const nombre = document.getElementById('chk-nombre').value;
    const ciudad = document.getElementById('chk-ciudad').value;

    if (!nombre || !ciudad) return alert("Por favor completa los datos.");

    const envio = TARIFAS_ENVIO[ciudad] || 0;

    // Preparamos los items
    const itemsParaPago = carrito.map(i => ({
        title: `${i.nombre} (${i.altura})`,
        unit_price: Number(PRECIOS_FRUTALES[i.altura][i.cantidad]),
        quantity: Number(i.cantidad),
        currency_id: 'COP'
    }));

    // Sumamos envío
    itemsParaPago.push({
        title: `ENVÍO: ${ciudad}`,
        unit_price: Number(envio),
        quantity: 1,
        currency_id: 'COP'
    });

    try {
        // Llamada a la función de Vercel
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: itemsParaPago })
        });

        const data = await response.json();

        // Inicializamos el checkout de Mercado Pago con el ID recibido
        const mp = new MercadoPago('TU_PUBLIC_KEY_AQUI', { locale: 'es-CO' });
        mp.checkout({
            preference: { id: data.id },
            autoOpen: true
        });

    } catch (error) {
        alert("Error en la conexión automática. Intenta por WhatsApp.");
    }
}
// --- UTILIDADES ---
function eliminarItem(index) { carrito.splice(index, 1); actualizarCarritoUI(); }
function toggleCart() { document.getElementById('cart-panel').classList.toggle('active'); }
function cerrarVentana() { document.getElementById('ventana-productos').style.display = 'none'; document.body.style.overflow = 'auto'; }
function configurarMenuMovil() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('nav-menu');
    if(toggle) toggle.addEventListener('click', () => { nav.classList.toggle('active'); toggle.classList.toggle('open'); });
}


