// ===== CARRITO =====

let carrito = [];
let total = 0;

// Contraseña del panel de administrador
const ADMIN_PASSWORD = "admin123";

function comprar(nombre, precio) {
let cantidad = 1;

if (nombre === "Carbón") {
    cantidad = 8;
}

if (nombre === "Hierro") {
    cantidad = 4;
}

const producto = carrito.find(item => item.nombre === nombre);

if (producto) {
    producto.cantidad += cantidad;
} else {
    carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    });
}

total += precio;

    actualizarCarrito();
}

function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    carrito.forEach((item, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
           ${item.nombre} x${item.cantidad} - ${item.precio} pesos fuertes
            <button onclick="eliminar(${index})">❌</button>
        `;

        lista.appendChild(li);

    });

    document.getElementById("total").innerText =
    "Total: " + total + " pesos fuertes";
}

function eliminar(index){

    total -= carrito[index].precio;

    carrito.splice(index,1);

    actualizarCarrito();

}

function vaciar(){

    carrito=[];

    total=0;

    actualizarCarrito();

}

function finalizar(){

    if(carrito.length===0){

        alert("Tu carrito está vacío.");

        return;

    }

    let nombre = prompt("¿Cuál es tu nombre?");

    if(!nombre) return;

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push({

        comprador:nombre,

        fecha:new Date().toLocaleString(),

        productos:[...carrito],

        total:total

    });

    localStorage.setItem("pedidos",JSON.stringify(pedidos));

    alert("✅ Pedido realizado correctamente.");

    vaciar();

}


// ===== PANEL ADMIN =====

function abrirPanel(){

    const pass = prompt("Contraseña:");

    if(pass !== "admin123"){
        alert("Contraseña incorrecta");
        return;
    }

    alert("Contraseña correcta.");

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if(pedidos.length === 0){
        alert("No hay pedidos.");
        return;
    }

    let texto = "";

    pedidos.forEach((pedido, i) => {

        texto += "Pedido " + (i + 1) + "\n";
        texto += "Comprador: " + pedido.comprador + "\n";
        texto += "Total: " + pedido.total + " monedas\n";
        texto += "----------------------\n";

    });

    alert(texto);
    if (confirm("¿Quieres borrar todos los pedidos?")) {
    borrarPedidos();
}

}
function borrarPedidos(){

    const pass = prompt("Vuelve a introducir la contraseña:");

    if(pass !== "admin123"){
        alert("Contraseña incorrecta");
        return;
    }

    if(confirm("¿Seguro que quieres borrar todos los pedidos?")){

        localStorage.removeItem("pedidos");

        alert("✅ Pedidos eliminados.");

    }

}


// ===== BOTÓN OCULTO =====

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.shiftKey && e.key==="A"){

        abrirPanel();

    }

});
