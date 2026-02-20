const params = new URLSearchParams(window.location.search);
const producto = params.get("producto");
const precio = parseInt(params.get("precio"));

document.getElementById("nombreProducto").innerText = producto;
document.getElementById("precioBase").innerText = precio.toLocaleString();
document.getElementById("total").innerText = precio.toLocaleString();

let total = precio;

document.querySelectorAll(".extra").forEach(extra=>{
extra.addEventListener("change",function(){
if(this.checked){
total += parseInt(this.value);
}else{
total -= parseInt(this.value);
}
document.getElementById("total").innerText = total.toLocaleString();
});
});

function enviarPedido(){
let mensaje = `Hola RE-LAX 🍸 quiero pedir ${producto}. Total: $${total}`;
window.open(`https://wa.me/573132659873?text=${encodeURIComponent(mensaje)}`);
}
