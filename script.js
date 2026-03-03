document.addEventListener("DOMContentLoaded", function(){

/* =========================================
   PRODUCTOS – PÁGINA PRINCIPAL
========================================= */

if(document.getElementById("productos")){
  const contenedor = document.getElementById("productos");

  productos.forEach(p=>{
    contenedor.innerHTML += `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <h4>$${p.precio.toLocaleString()}</h4>
        <button onclick="verProducto('${p.id}')">Ver más</button>
      </div>
    `;
  });
}

/* =========================================
   FUNCIÓN REDIRECCIÓN
========================================= */

window.verProducto = function(id){
  window.location.href = "producto.html?id=" + id;
}

/* =========================================
   DETALLE PRODUCTO – PÁGINA 2 (VERSIÓN CORRECTA)
========================================= */

if(document.getElementById("producto-nombre")){

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const producto = productos.find(p => p.id === id);

  if(producto){

    // Imagen
    const img = document.getElementById("producto-imagen");
    img.src = producto.imagenDetalle || producto.imagen;
    img.alt = producto.nombre;

    // Nombre
    document.getElementById("producto-nombre").textContent = producto.nombre;

    // Descripción
    document.getElementById("producto-descripcion").textContent = producto.descripcion;

    // Precio
    document.getElementById("producto-precio").textContent =
      "$" + producto.precio.toLocaleString();

    // Botón WhatsApp
    const btn = document.getElementById("btn-whatsapp");
    btn.href =
      "https://wa.me/573132659873?text=Hola quiero pedir " +
      encodeURIComponent(producto.nombre);
  }
}
   
/* =========================================
   PARTÍCULAS (SOLO INDEX)
========================================= */

const canvas = document.getElementById("particles");

if(canvas){

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let particlesArray = [];

  class Particle{
    constructor(){
      this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height;
      this.size = Math.random()*3+1;
      this.speedY = Math.random()*1+0.5;
    }
    update(){
      this.y += this.speedY;
      if(this.y > canvas.height){
        this.y = 0;
        this.x = Math.random()*canvas.width;
      }
    }
    draw(){
      ctx.fillStyle = "rgba(0,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
    }
  }

  function init(){
    particlesArray = [];
    for(let i=0;i<40;i++){
      particlesArray.push(new Particle());
    }
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p=>{
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
}

}); 

/* =========================================
   CONTADOR ANIMADO
========================================= */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const increment = target / 100;

    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

/* =========================================
   SCROLL REVEAL
========================================= */

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if(revealTop < windowHeight - revealPoint){
      el.classList.add("active");
    }
  });
});
